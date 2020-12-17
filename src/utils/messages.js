const generateMessage= function(packet){
	var options = {hour:"2-digit",minute:"2-digit", second:"2-digit", weekday: 'long' };
	var today  = new Date();
	
	var time=new Date(Date.now()).toISOString();
	return {
		...packet,
		time
	}
}


module.exports={
	generateMessage:generateMessage
}
