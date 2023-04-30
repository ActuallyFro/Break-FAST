function ReturnColumn(str, col) {
	var arr = str.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
	return arr[col].replace(/"/g, "");
}



// Load Questions from File; Load data from LocalStorage IF exists...
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var questions = this.responseText.split("\n");
		var formElements = document.getElementById("formElements");
		var mandatoryElements = document.createElement("div"); // Create a new div for mandatory elements
		mandatoryElements.id = "mandatoryElements";
		mandatoryElements.style.display = "none"; // Hide the div initially
		
		var Sections = [];

		for (var i = 0; i < questions.length; i++) {
			if (questions[i].startsWith("#")) {
				continue;
			}

			var ID= ReturnColumn(questions[i], 0);
			var Section = ReturnColumn(questions[i], 1);
			var Type = ReturnColumn(questions[i], 2);
			var question = ReturnColumn(questions[i], 3);
			var required = ReturnColumn(questions[i], 4);

			if (Sections.indexOf(Section) == -1) {
				Sections.push(Section);

				var newSection = document.createElement("h2");
				newSection.innerHTML = Section;
				newSection.id = Section;
				formElements.appendChild(newSection);
			}

			var label = document.createElement("label");
			label.innerHTML = "["+ Type +"] " + question;

			var input = document.createElement("textarea");
			input.name = ID;
			input.rows = 3;
			input.className = "form-control";
			input.id = question;

			var responseDATA = localStorage.getItem(ID);
			if (responseDATA) {
				input.value = responseDATA;
			} 

			formElements.appendChild(label);
			formElements.appendChild(document.createElement("br"));
			formElements.appendChild(input);
			formElements.appendChild(document.createElement("br"));
			formElements.appendChild(document.createElement("br"));

			// Check if the question is mandatory and add it to the mandatoryElements div
			if (required === "mandatory") {
				mandatoryElements.appendChild(label.cloneNode(true)); // Use cloneNode to create a copy of the label
				mandatoryElements.appendChild(document.createElement("br"));
				mandatoryElements.appendChild(input.cloneNode(true)); // Use cloneNode to create a copy of the input
				mandatoryElements.appendChild(document.createElement("br"));
				mandatoryElements.appendChild(document.createElement("br"));
			}
		}

		// Add the mandatoryElements div to the formElements div
		formElements.appendChild(document.createElement("br"));
		formElements.appendChild(document.createElement("br"));
		formElements.appendChild(document.createElement("hr"));
		formElements.appendChild(document.createElement("h3")).innerHTML = "Mandatory Questions";
		var toggle = document.createElement("a");
		toggle.innerHTML = "[+]";
		toggle.style.marginLeft = "10px";
		toggle.style.cursor = "pointer";
		toggle.addEventListener("click", function() {
			if (mandatoryElements.style.display === "none") {
				mandatoryElements.style.display = "block";
				toggle.innerHTML = "[-]";
			} else {
				mandatoryElements.style.display = "none";
				toggle.innerHTML = "[+]";
			}
		});
		formElements.lastElementChild.appendChild(toggle);
		formElements.appendChild(document.createElement("br"));
		formElements.appendChild(mandatoryElements);
	}
};
xhr.open("GET", "questions.csv");
xhr.send();

function saveForm() {
	var form = document.getElementById("myForm");

	for (var i = 0; i < form.elements.length; i++) {
		if (form.elements[i].name != ""){

			if (form.elements[i].value != ""){
				localStorage.setItem(form.elements[i].name, form.elements[i].value);
			}
		}

	}

	alert("Form data SAVED in LocalStorage!");
}


function exportForm() {
	var formData = {};
	var inputs = document.querySelectorAll("form#myForm input, form#myForm textarea");
	for (var i = 0; i < inputs.length; i++) {
		formData[inputs[i].name] = inputs[i].value;
	}

	var jsonString = JSON.stringify(formData, null, 2);

	var downloadLink = document.createElement("a");
	downloadLink.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(jsonString));
	downloadLink.setAttribute("download", "form-data.json");
	downloadLink.style.display = "none";
	document.body.appendChild(downloadLink);

	downloadLink.click();

	document.body.removeChild(downloadLink);


}

function importForm() {
	var fileInput = document.createElement("input");
	fileInput.setAttribute("type", "file");
	
	fileInput.addEventListener("change", function(event) {
	  var file = event.target.files[0];
	  
	  var reader = new FileReader();
	  reader.onload = function(event) {

			var jsonData = JSON.parse(event.target.result);
		var inputs = document.querySelectorAll("form#myForm input, form#myForm textarea");
		for (var i = 0; i < inputs.length; i++) {
		  if (jsonData.hasOwnProperty(inputs[i].name)) {
			inputs[i].value = jsonData[inputs[i].name];
		  }
		}

	  };
	  reader.readAsText(file);
	});
	
	fileInput.click();
}

const toggleSwitch = document.querySelector('#dark-mode-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
	document.documentElement.setAttribute('data-theme', currentTheme);

	if (currentTheme === 'dark') {
		toggleSwitch.checked = true;
	}
}

function switchTheme(event) {
	if (event.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
	}
}

toggleSwitch.addEventListener('change', switchTheme, false);

