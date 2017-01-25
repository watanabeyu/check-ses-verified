/* Imports */
var AWS = require('aws-sdk');

exports.handler = function(event, context){
  var ses = new AWS.SES({apiVersion:'2010-12-01'});

  var params = {
    Identities:[event.email]
  };
  ses.getIdentityVerificationAttributes(params,function(err,data){
    if(err){
      context.fail(err);
    }
    else{
      if(data.VerificationAttributes[event.email]){
        r = data.VerificationAttributes[event.email].VerificationStatus == "Success"?true:false;
        context.succeed({result:r});
      }
      else{
        context.succeed({result:false});
      }
    }
  });
}