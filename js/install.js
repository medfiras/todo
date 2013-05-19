function go(){
	// alert(self.location.hostname);
	var appUrl = document.location + "/manifest.webapp"
	var request = navigator.mozApps.install(appUrl);
	request.onsuccess = function() {
		console.log("installed !");
	};
	request.onerror = function() {
		console.error("error !");
		console.error(this.error.name);
		// whoops - this.error.name has details
	};
}