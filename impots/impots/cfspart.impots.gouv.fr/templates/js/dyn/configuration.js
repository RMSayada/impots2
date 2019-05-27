afficherVersion="";

afficherGestPas=1;
afficherActualites=1;
urlBudget="https://www.aquoiserventmesimpots.gouv.fr/";
/* var afficheSmartBanner=new Object();
afficheSmartBanner["apple"]=0;
afficheSmartBanner["wphone"]=1;
afficheSmartBanner["android"]=0;  
console.log("Andro"+afficheSmartBanner["android"]);
console.log("Apple"+afficheSmartBanner["apple"]); */
//
//


pageServices="/monprofil-webapp/monCompte";
if (window.location.pathname.search(pageServices)==0) {
	var stateObj = { histo: "back" };
	history.pushState(stateObj, null, '/cmd/DACLogout');
	history.pushState(stateObj, null, pageServices);
	window.addEventListener('popstate', function (event)
	{
		console.log("Detection event");
		window.location.href='/cmd/DACLogout';
  		history.pushState(null, "",  '/cmd/DACLogout');
  		history.pushState(null, "",  '/cmd/DACLogout');
	});
	console.log("Sur PS detecte -> logout en back");
}
