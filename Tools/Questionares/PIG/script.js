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
