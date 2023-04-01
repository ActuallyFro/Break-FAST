function ReturnColumn(str, col) {
	// String is CSV, wrap in quotes, split on commas and quotes
	var arr = str.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
	return arr[col].replace(/"/g, "");
}

// Load Questions from File; Load data from LocalStorage IF exists...
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var questions = this.responseText.split("\n");
		var formElements = document.getElementById("formElements");
		
		var Sections = [];

		for (var i = 0; i < questions.length; i++) {
			// console.log(questions[i]);

			var ID= ReturnColumn(questions[i], 0);
			var Section = ReturnColumn(questions[i], 1);
			var Type = ReturnColumn(questions[i], 2);
			var question = ReturnColumn(questions[i], 3);

			if (Sections.indexOf(Section) == -1) {
				Sections.push(Section);

				var newSection = document.createElement("h2");
				newSection.innerHTML = Section;
				//id="Software Problem Area Taxonomy (SPAT)"
				newSection.id = Section;
				formElements.appendChild(newSection);
			}

			var label = document.createElement("label");
			label.innerHTML = "["+ Type +"] " + question;

			var input = document.createElement("textarea");
			// input.type = "text";
			input.name = ID;
			input.rows = 3;
			input.className = "form-control";
			input.id = question;

			//Check if data exists in LocalStorage
			var responseDATA = localStorage.getItem(ID);
			if (responseDATA) {
				input.value = responseDATA;
				// console.log("[DEBUG] Data for " + ID + " = " + responseDATA);
			} 
			// else {
			// 	console.log("[DEBUG] No data for " + ID);
			// }

			formElements.appendChild(label);
			formElements.appendChild(document.createElement("br"));
			formElements.appendChild(input);
			formElements.appendChild(document.createElement("br"));
			formElements.appendChild(document.createElement("br"));
		}
	}
};
xhr.open("GET", "questions.csv");
xhr.send();

function saveForm() {
	var form = document.getElementById("myForm");

	//console loop/show elements
	// console.log("[DEBUG] Form Elements <" + form.elements.length + ">:");
	for (var i = 0; i < form.elements.length; i++) {
		if (form.elements[i].name != ""){
			// console.log("[DEBUG] NON-empty element (" + i + ") found!");
			// console.log("[DEBUG] "+form.elements[i].name + " = " + form.elements[i].value);

			if (form.elements[i].value != ""){
				//console.log("[DEBUG] NOT-EMPTY! Storing in LocalStorage...");
				localStorage.setItem(form.elements[i].name, form.elements[i].value);
			}
			// else {
			// 	console.log("[DEBUG] EMPTY! NOT Storing");
			// } 

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

	// Create a temporary <a> element to download the file
	var downloadLink = document.createElement("a");
	downloadLink.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(jsonString));
	downloadLink.setAttribute("download", "form-data.json");
	downloadLink.style.display = "none";
	document.body.appendChild(downloadLink);

	downloadLink.click();

	document.body.removeChild(downloadLink);


}

// importForm()
function importForm() {
	var fileInput = document.createElement("input");
	fileInput.setAttribute("type", "file");
	
	fileInput.addEventListener("change", function(event) {
	  var file = event.target.files[0];
	  //console.log("[DEBUG] File Name: " + file.name);
	  
	  var reader = new FileReader();
	  reader.onload = function(event) {
		//console.log("[DEBUG] File Contents: " + event.target.result);
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

// Get the dark mode toggle switch
const toggleSwitch = document.querySelector('#dark-mode-toggle');

// Check the saved theme preference (if any)
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
	// Set the saved theme preference
	document.documentElement.setAttribute('data-theme', currentTheme);

	// Check the saved theme preference in the toggle switch
	if (currentTheme === 'dark') {
		toggleSwitch.checked = true;
	}
}

// Switch between light and dark mode
function switchTheme(event) {
	if (event.target.checked) {
		// Set the theme to dark
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
	} else {
		// Set the theme to light
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
	}
}

// Listen for the toggle switch click event
toggleSwitch.addEventListener('change', switchTheme, false);
