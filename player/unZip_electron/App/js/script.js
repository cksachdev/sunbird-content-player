const { ipcRenderer } = require('electron');

$(document).ready(() => {
	$(".container-fluid").show();

myDropzone = new Dropzone("#dragdropzone", {
		url: "/asd",
		autoQueue: false,
		dictDefaultMessage: "Drag & drop or click here to select ECML",
		acceptedFiles: 'application/zip',
		addRemoveLinks: true,
		createImageThumbnails: false,
		init: function () {
			this.on("addedfile", function (file) {
				file.previewTemplate = Dropzone.createElement(this.options.previewTemplate);

				if (myDropzone.files.length > 0) {
					$(".validation-error").hide()
				}
			})
		}
	});
$(".upload-submit-btn").click(() => {
		filePaths = myDropzone.files.map((file) => {
			return {
				path: file.path,
				name: file.name
			}
		})
		if (filePaths.length > 0) {
			$(".step1-fieldset").hide()
			$(".step2-fieldset").show()

			//	
			ipcRenderer.send("import-files", filePaths)

		} else {
			$(".validation-error").show()
		}

	})
})