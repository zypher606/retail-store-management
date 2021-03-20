class ResponseUtil {
    
  constructor(code, message, data = null, metadata = null, session = null) {
      this.code = code;
      this.message = message;
      this.data = data;

      // if (metadata) this.metadata = metadata;

      // if (session) this.session = session;
  }
}

exports.ResponseUtil = ResponseUtil;