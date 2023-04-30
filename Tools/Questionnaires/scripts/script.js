const labelColors = ['#2F4D7E', '#7E2F2F', '#4D7E2F', '#563D7C', '#7E6B2F', '#2F7373', '#6B2F6E', '#7E7D4D', '#365899', '#7E476B', '#369962', '#6E2F2F', '#367373', '#6E2F6E', '#7E7A00', '#2F3E73', '#6E1F00', '#1F4D4D', '#5B2828', '#3A512B'];

currentLabelColor = -1;

const complementaryColors = labelColors.map(color => {
  const r = parseInt(color.slice(1,3), 16);
  const g = parseInt(color.slice(3,5), 16);
  const b = parseInt(color.slice(5), 16);
  
  const compR = (255 - r).toString(16).padStart(2, '0');
  const compG = (255 - g).toString(16).padStart(2, '0');
  const compB = (255 - b).toString(16).padStart(2, '0');
  
  return `#${compR}${compG}${compB}`;
});

const lightModeComplementaryColors = labelColors.map(color => {
  const r = parseInt(color.slice(1,3), 16);
  const g = parseInt(color.slice(3,5), 16);
  const b = parseInt(color.slice(5), 16);
  
  const compR = (255 - r) / 2; //twice as dark
  const compG = (255 - g) / 2; //twice as dark
  const compB = (255 - b) / 2; //twice as dark
  
  // combine the components into a new color string
  return `#${Math.round(compR).toString(16).padStart(2, '0')}${Math.round(compG).toString(16).padStart(2, '0')}${Math.round(compB).toString(16).padStart(2, '0')}`;
});

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
				formElements.appendChild(document.createElement("hr"));
				Sections.push(Section);

				var newSection = document.createElement("h2");
				newSection.innerHTML = Section;
				newSection.id = Section;
				formElements.appendChild(newSection); //mandatory elements
				// append HR
				formElements.appendChild(document.createElement("hr"));

				var optionalElements = document.createElement("div"); // Create a new div for optional elements
				optionalElements.id = "optionalElements"+Section;
				optionalElements.style.display = "none";

				formElements.appendChild(document.createElement("br"));
				formElements.appendChild(document.createElement("br"));
				
				var optionalElementsDivider = document.createElement("div"); // Create a new div for mandatory elements
				optionalElementsDivider.id = "optionalElementsDivider"+Section;
				formElements.appendChild(optionalElementsDivider);

				formElements.appendChild(document.createElement("h5")).innerHTML = "Optional Questions";

				var toggle = document.createElement("a");
				toggle.id = Section + "Toggle"; // add unique identifier based on section name
				toggle.innerHTML = "[+]";
				toggle.style.marginLeft = "10px";
				toggle.style.cursor = "pointer";

				toggle.addEventListener("click", function() {
					var optionalElements = document.getElementById("optionalElements" + this.id.slice(0, -6)); // use id to get the corresponding optional elements
		
					if (optionalElements.style.display === "none") {
						optionalElements.style.display = "block";
						this.innerHTML = "[-]";
					} else {
						optionalElements.style.display = "none";
						this.innerHTML = "[+]";
					}
				});

				formElements.lastElementChild.appendChild(toggle);
				formElements.appendChild(document.createElement("br"));
				formElements.appendChild(optionalElements);

				currentLabelColor += 1;
			}

			var label = document.createElement("label");
			label.innerHTML = "["+ Type +"] " + question;
			label.style.fontWeight = "bold";
			label.style.color = labelColors[currentLabelColor];

			var input = document.createElement("textarea");
			input.name = ID;
			input.rows = 3;
			input.className = "form-control";
			input.id = question;

			var responseDATA = localStorage.getItem(ID);
			if (responseDATA) {
				input.value = responseDATA;
			} 

			if (required === "mandatory") {
				formElements.insertBefore(label, optionalElementsDivider);
				formElements.insertBefore(document.createElement("br"), optionalElementsDivider);
				formElements.insertBefore(input, optionalElementsDivider);
				formElements.insertBefore(document.createElement("br"), optionalElementsDivider);
				formElements.insertBefore(document.createElement("br"), optionalElementsDivider);				
				
			} else { // if (required !== "mandatory") {
				label.style.fontWeight = "normal";
				label.style.fontStyle = "italic";

				if (document.documentElement.getAttribute('data-theme') === 'dark') {
					label.style.color = complementaryColors[currentLabelColor];
				} else {
					label.style.color = lightModeComplementaryColors[currentLabelColor];
				}

				optionalElements.appendChild(label.cloneNode(true)); // Use cloneNode to create a copy of the label
				optionalElements.appendChild(document.createElement("br"));
				optionalElements.appendChild(input.cloneNode(true)); // Use cloneNode to create a copy of the input
				optionalElements.appendChild(document.createElement("br"));
				optionalElements.appendChild(document.createElement("br"));
			}
		}

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

