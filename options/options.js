function saveOptions(e)
{
	browser.storage.local.set({
		urlsToGhostify: document.querySelector("#urlsToGhostify").value
		,urlGhosts: document.getElementById("urlGhosts").value
		,isHidden: document.getElementById("isHidden").checked
		,debug: document.getElementById("debug").checked
	});
	notifyBackgroundScript();
}


function notifyBackgroundScript(e)
{
	var sending = browser.runtime.sendMessage({
		message: "urls_stored"  // TODO Use Enumeration
	});
	sending.then(onResponse, onError);
}


function onResponse(messsage)
{
	console.log("Message from the background script: " + message);
}


function onError(messsage)
{
	console.log(`Error: ${error}`);
}


// Handle the promise:
function restoreOptions()
{
	function setCurrentChoice(result)
	{
		document.querySelector("#urlsToGhostify").value
		 = result.urlsToGhostify || "";
	}
	function setCurrentChoiceUrlGhosts(result)
	{
		document.querySelector("#urlGhosts").value
		 = result.urlGhosts || "";
	}
	function setCurrentChoiceIsHidden(result)
	{
		document.querySelector("#isHidden").checked
		 = result.isHidden || false;
	}
	function setCurrentChoiceDebug(result)
	{
		document.querySelector("#debug").checked
		 = result.debug || false;
	}

	function onError(error)
	{
		console.log(`Error: ${error}`);
	}

	var getting = browser.storage.local.get("urlsToGhostify");
	getting.then(setCurrentChoice, onError);

	getting = browser.storage.local.get("urlGhosts");
	getting.then(setCurrentChoiceUrlGhosts, onError);

	getting = browser.storage.local.get("isHidden");
	getting.then(setCurrentChoiceIsHidden, onError);

	getting = browser.storage.local.get("debug");
	getting.then(setCurrentChoiceDebug, onError);

}


document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

