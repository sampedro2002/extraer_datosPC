/*################################################################################################*/
/*####################################### CLIENTE MQTT ###########################################*/
/*################################################################################################*/

//var wsbroker = "192.168.0.3";  //mqtt websocket enabled broker
//var wsbroker = "localhost";
var wsbroker = "broker.hivemq.com";

//var wsport = 8083 // port for above
var wsport = 1883; // port for above

var client = new Paho.MQTT.Client(
	wsbroker,
	Number(8000),
	"myclientid_" + parseInt(Math.random() * 100, 10)
);

client.onConnectionLost = function (responseObject) {
	console.log("connection lost: " + responseObject.errorMessage);
};

/*################################################################################################*/
/*####################################### LLEGA EL MENSAJE########################################*/
/*################################################################################################*/

client.onMessageArrived = function (message) {
	let destination = message.destinationName;
	if (destination === "pruebatopico") {
		let response = JSON.parse(message.payloadString);
		dataFormat = response;
		
		let dataCPU = dataFormat.CPU;
		let dataAlmc = dataFormat.Alc;
		let dataTpt = dataFormat.Tpt;
		
		addData(
			myChart,parseFloat(dataCPU),
		);
		addDataAlmc(
			myChartAlm,
			parseFloat(dataAlmc),
		);
		addDataTemp(
			myChartTemp,
			parseFloat(dataTpt),
		);
		
	}
};

var options = {
	timeout: 3,
	onSuccess: function () {
		console.log("mqtt connected");
		// Connection succeeded; subscribe to our topic, you can add multile lines of these
		client.subscribe("pruebatopico", { qos: 1 });
	},
	onFailure: function (message) {
		console.log("Connection failed: " + message.errorMessage);
	},
};

function init() {
	client.connect(options);
}
