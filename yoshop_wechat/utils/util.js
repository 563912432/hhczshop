function t(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), o = e.getMonth() + 1, r = e.getDate(), u = e.getHours(), i = e.getMinutes(), g = e.getSeconds();
        return [ n, o, r ].map(t).join("/") + " " + [ u, i, g ].map(t).join(":");
    },

    telMatch: function(e) {
      let pattern = /^1[3|4|5|6|7|8|9][0-9]{9}$/;   //手机号码验证规则
      if (!pattern.exec(e)) {
        return false
      }
      return true
    }
}; 
