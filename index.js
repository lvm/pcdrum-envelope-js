function envelopeNode(a, d, s, r){
  this.gain.value = 0;
  this.att = a;
  this.dec = d;
  this.sus = s;
  this.rel = r;

  this.trigger = function(length){
    var now = this.context.currentTime;
    var gain = this.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(0, now);
    gain.linearRampToValueAtTime(1.0, now + this.att);
    now += this.att;
    gain.linearRampToValueAtTime(this.sus, now + this.dec);
    if (length){
      var self = this;
      setTimeout(function(){ self.release(); }, length * 1000);
    }
  };
  this.release = function(){
    var now = this.context.currentTime;
    var gain = this.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(gain.value, now);
    gain.linearRampToValueAtTime(0, now + this.rel);
  }
}

module.exports = function(ctx, a, d, s, r){
  var gain = ctx.createGain();
  envelopeNode.call(gain, a, d, s, r);
  return gain;
}
