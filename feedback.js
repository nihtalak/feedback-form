(function (d, w) { 'use strict';
function prevented(fn) {
  return function (e) {
    e.preventDefault(); fn();
  }
}
function find(id) {
  return d.getElementById(id);
}

w.$feedback = {
  css: "#ff-dialog{width:400px;position:fixed;bottom:0;right:50px;background:rgba(255,255,255,0.9);box-shadow:0 0 25px #aaa;z-index:999999999}" +
    "#ff-dialog h5{text-align:left;font-size:24px;margin:0;background:rgba(61, 194, 85, 0.8);padding:5px 10px;cursor:pointer;}" +
    "#ff-dialog #dialog-body{max-height:250px;transition: max-height 0.5s ease-in}" +
    "#ff-dialog #dialog-body.closed{max-height:0;transition: max-height 0.5s ease-out}" +
    "#ff-dialog #dialog-body>div{padding:10px 25px}" +
    "#ff-email{text-align:left;font-size:100%;width:100%;margin:10px 0 0 0;padding:5px 10px;box-sizing:border-box;}" +
    "#ff-submit-wrapper{text-align:center; margin-top:10px;}" +
    "#ff-submit{font-weight:bold;font-size:120%;padding:10px;width: 50%}" +
    "#ff-submit:hover{opacity:.7}" +
    "#ff-submit[disabled]:hover{opacity:inherit}" +
    "#ff-dialog-close{float:right;padding:5px 10px;font-size:24px;color:rgba(0,0,0,.3);line-height:1;text-decoration:none;}" +
    "#ff-dialog #ff-message{display:block;width:100%;height:100px;resize:none;border-color:lightgray;box-sizing:border-box;font-size:100%;margin-top:10px}",

  init: function() {
    this.loadCSS();
    this.prepareHTML();
    this.loadHTML();
  },

  loadCSS: function() {
    d.head.innerHTML += "<style>" + this.css + "</style>";
  },

  prepareHTML: function() {
    this.html =
      '<div id="ff-dialog">' +
        '<a id="ff-dialog-close" href="#" style="display:none;">&times;</a>' +
        '<h5 id="ff-header">Feedback</h5>' +
        '<div id="dialog-body" class="closed">' +
          '<div id="db">' +
            '<div id="status">Error/success message</div>' +
              '<textarea id="ff-message" required></textarea>' +
                '<input id="ff-email" type="email" placeholder="Email" maxlength="500" style="display:none">' +
              '<div id="ff-submit-wrapper"><button id="ff-submit" disabled="disabled">Send</button></div>' +
          "</div>" +
        "</div>"+
      "</div>";
  },

  loadHTML: function() {
    d.body.innerHTML += this.html;
    if (!this.user) {
      find("ff-email").addEventListener("blur", prevented(this.setEmail.bind(this)), false);
    }
    
    find("ff-header").addEventListener("click", prevented(this.openDialog.bind(this)), false);
    find("ff-dialog-close").addEventListener("click", prevented(this.closeDialog), false);
    find("ff-message").addEventListener("input", this.handleSubmitButton, false);
  },

  closeDialog: function() {
    find("dialog-body").classList.add("closed");
    find("ff-dialog-close").style.display = "none";
  },

  openDialog: function() {
    if (!this.user) {
      find("ff-email").style.display = 'initial';
    }
    if (this.email) {
      find("ff-email").value = this.email;
    }
    find("dialog-body").classList.remove("closed");
    find("ff-dialog-close").style.display = "block";
  },

  handleSubmitButton: function () {
    var submit = find("ff-submit");
    if (find("ff-message").value.trim()) {
      submit.disabled = null;
    } else {
      submit.disabled = "disabled";
    }
  },

  setEmail: function() {
    var emailField = find("ff-email");
    if (emailField.validity.valid) {
      this.email = emailField.value;
    }
  }
};

}(document, window));