/**
 * Puti Classroom Realtime Engine
 * Zero-server, cross-device MQTT-over-WebSocket realtime sync.
 * Enables live mobile student voting & buzzers to project instantly on the smartboard.
 */

class ClassroomRealtimeEngine {
  constructor() {
    this.room = this.getOrCreateRoomId();
    this.client = null;
    this.connected = false;
    this.listeners = {};
    this.broadcastChannelPoll = new BroadcastChannel('puti_classroom_poll_' + this.room);
    this.broadcastChannelBuzzer = new BroadcastChannel('puti_classroom_buzzer_' + this.room);

    this.initBroadcastFallback();
    this.initMqtt();
  }

  getOrCreateRoomId() {
    let room = localStorage.getItem('puti_classroom_room');
    if (!room) {
      // 5-character friendly uppercase code
      room = 'C' + Math.floor(10000 + Math.random() * 90000);
      localStorage.setItem('puti_classroom_room', room);
    }
    return room;
  }

  initMqtt() {
    if (typeof Paho === 'undefined') {
      console.warn('Paho MQTT not loaded, relying on BroadcastChannel fallback.');
      return;
    }

    const clientId = 'puti_host_' + Math.random().toString(16).substring(2, 10);
    // Use EMQX public high-availability TLS broker
    this.client = new Paho.MQTT.Client('broker.emqx.io', 8084, '/mqtt', clientId);

    this.client.onConnectionLost = (responseObject) => {
      this.connected = false;
      console.warn('Realtime connection lost:', responseObject.errorMessage);
      setTimeout(() => this.initMqtt(), 3000);
    };

    this.client.onMessageArrived = (message) => {
      try {
        const topic = message.destinationName;
        const payload = JSON.parse(message.payloadString);
        this.dispatch(topic, payload);
      } catch (err) {
        console.error('MQTT parse error:', err);
      }
    };

    const options = {
      useSSL: true,
      timeout: 5,
      keepAliveInterval: 30,
      cleanSession: true,
      onSuccess: () => {
        this.connected = true;
        console.log(`[RealtimeEngine] Connected to Cloud MQTT Broker. Room: ${this.room}`);
        // Subscribe to classroom channels
        this.client.subscribe(`puti/class/${this.room}/poll/vote`);
        this.client.subscribe(`puti/class/${this.room}/buzzer/buzz`);
      },
      onFailure: (err) => {
        console.warn('[RealtimeEngine] MQTT connection failed, retrying in 4s...', err);
        setTimeout(() => this.initMqtt(), 4000);
      }
    };

    try {
      this.client.connect(options);
    } catch (e) {
      console.warn('MQTT connect error:', e);
    }
  }

  initBroadcastFallback() {
    this.broadcastChannelPoll.onmessage = (e) => {
      this.dispatch(`puti/class/${this.room}/poll/vote`, e.data);
    };
    this.broadcastChannelBuzzer.onmessage = (e) => {
      this.dispatch(`puti/class/${this.room}/buzzer/buzz`, e.data);
    };
  }

  subscribe(topicSuffix, callback) {
    const fullTopic = `puti/class/${this.room}/${topicSuffix}`;
    if (!this.listeners[fullTopic]) {
      this.listeners[fullTopic] = [];
    }
    this.listeners[fullTopic].push(callback);
  }

  dispatch(topic, data) {
    if (this.listeners[topic]) {
      this.listeners[topic].forEach(cb => {
        try { cb(data); } catch (e) { console.error('Callback error:', e); }
      });
    }
  }

  publish(topicSuffix, data) {
    const fullTopic = `puti/class/${this.room}/${topicSuffix}`;
    const payloadStr = JSON.stringify(data);

    // Send via MQTT if connected
    if (this.client && this.connected) {
      try {
        const message = new Paho.MQTT.Message(payloadStr);
        message.destinationName = fullTopic;
        this.client.send(message);
      } catch (err) {
        console.warn('MQTT publish failed:', err);
      }
    }

    // Also send via local BroadcastChannel
    if (topicSuffix.includes('poll')) {
      this.broadcastChannelPoll.postMessage(data);
    } else if (topicSuffix.includes('buzzer')) {
      this.broadcastChannelBuzzer.postMessage(data);
    }
  }
}

window.realtimeEngine = new ClassroomRealtimeEngine();
