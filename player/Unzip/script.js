const { ipcRenderer } = require('electron');

$(document).ready(() => {
	$(".container-fluid").show()

	$.getJSON("./packs.json", null, function (packs) {
		$.each(packs, function (i, pack) {
			$('#packsSelectBox').append($('<option>', {
				value: pack,
				text: pack
			}));
			$('#packsSelectBox').select2();
		});
	});

	myDropzone = new Dropzone("#dragdropzone", {
		url: "/asd",
		autoQueue: false,
		dictDefaultMessage: "Drag & drop or click here to select Files for extracting QR Codes",
		acceptedFiles: 'application/pdf',
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