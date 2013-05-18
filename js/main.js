var todo = {
	index: window.localStorage.getItem("todo:index"),
	$table: document.getElementById("todo-table"),
	$form: document.getElementById("todo-form"),
	$button_save: document.getElementById("todo-op-save"),
	$button_discard: document.getElementById("todo-op-discard"),

	init: function() {
		// initialize storage index
		if (!todo.index) {
			window.localStorage.setItem("todo:index", todo.index = 1);
		}
		// initialize form
		todo.$form.reset();
		todo.$button_discard.addEventListener("click", function(event) {
			todo.$form.reset();
			todo.$form.id_entry.value = 0;
		}, true);
		todo.$form.addEventListener("submit", function(event) {
			var entry = {
				id: parseInt(this.id_entry.value),
				t_name: this.t_name.value,
				date: this.date.value,
				desc: this.desc.value
			};
			if (entry.id == 0) { // add
				todo.storeAdd(entry);
				todo.tableAdd(entry);
			}
			else { // edit
				todo.storeEdit(entry);
				todo.tableEdit(entry);
			}

			this.reset();
			this.id_entry.value = 0;
			event.preventDefault();
		}, true);
		// initialize table
		if (window.localStorage.length - 1) {
			var todo_list = [], i, key;
			for (i = 0; i < window.localStorage.length; i++) {
				key = window.localStorage.key(i);
				if (/todo:\d+/.test(key)) {
					todo_list.push(JSON.parse(window.localStorage.getItem(key)));
				}
			}

			if (todo_list.length) {
				todo_list
					.sort(function(a, b) {
						return a.date > b.date ? -1 : (a.date < b.date ? 1 : 0);
					})
					.forEach(todo.tableAdd);
			}
		}
		todo.$table.addEventListener("click", function(event) {
			var op = event.target.getAttribute("data-op");
			if (/edit|remove/.test(op)) {
				var entry = JSON.parse(window.localStorage.getItem("todo:"+ event.target.getAttribute("data-id")));
				if (op == "edit") {
					todo.$form.t_name.value = entry.t_name;
					todo.$form.date.value = entry.date;
					todo.$form.desc.value = entry.desc;
					todo.$form.id_entry.value = entry.id;
				}
				else if (op == "remove") {
					if (confirm('Are you sure you want to remove "'+ entry.t_name +'" from your todo list?')) {
						todo.storeRemove(entry);
						todo.tableRemove(entry);
					}
				}
				event.preventDefault();
			}
		}, true);
	},

	storeAdd: function(entry) {
		entry.id = todo.index;
		window.localStorage.setItem("todo:index", ++todo.index);
		window.localStorage.setItem("todo:"+ entry.id, JSON.stringify(entry));
	},
	storeEdit: function(entry) {
		window.localStorage.setItem("todo:"+ entry.id, JSON.stringify(entry));
	},
	storeRemove: function(entry) {
		window.localStorage.removeItem("todo:"+ entry.id);
	},

	tableAdd: function(entry) {
		var $tr = document.createElement("tr"), $td, key;
		for (key in entry) {
			if (entry.hasOwnProperty(key)) {
				if(key!='id'){
					$td = document.createElement("td");
				$td.appendChild(document.createTextNode(entry[key]));
				$tr.appendChild($td);
				}
				
			}
		}
		$td = document.createElement("td");
		$td.innerHTML = '<a data-op="edit" data-id="'+ entry.id +'"><img title="Click to edit" data-op="edit" data-id="'+ entry.id +'" src="img/edit.png"></a>  <a data-op="remove" data-id="'+ entry.id +'"><img title="Click to remove" data-op="remove" data-id="'+ entry.id +'" src="img/delete.png"></a>';
		$tr.appendChild($td);
		$tr.setAttribute("id", "entry-"+ entry.id);
		todo.$table.appendChild($tr);
	},
	tableEdit: function(entry) {
		var $tr = document.getElementById("entry-"+ entry.id), $td, key;
		$tr.innerHTML = "";
		for (key in entry) {
			if(key!='id'){
				if (entry.hasOwnProperty(key)) {
				$td = document.createElement("td");
				$td.appendChild(document.createTextNode(entry[key]));
				$tr.appendChild($td);
			}
			}
			
		}
		$td = document.createElement("td");
		$td.innerHTML = '<a data-op="edit" data-id="'+ entry.id +'"><img title="Click to edit" data-op="edit" data-id="'+ entry.id +'" src="img/edit.png"></a>  <a data-op="remove" data-id="'+ entry.id +'"><img title="Click to remove" data-op="remove" data-id="'+ entry.id +'" src="img/delete.png"></a>';
		$tr.appendChild($td);
	},
	tableRemove: function(entry) {
		todo.$table.removeChild(document.getElementById("entry-"+ entry.id));
	}
};
todo.init();