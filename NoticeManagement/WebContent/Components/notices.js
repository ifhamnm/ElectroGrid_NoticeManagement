$(document).ready(function()
{
		if ($("#alertSuccess").text().trim() == "")
		{
			$("#alertSuccess").hide();
		}
		$("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
		// Clear alerts---------------------
		$("#alertSuccess").text("");
		$("#alertSuccess").hide();
		$("#alertError").text("");
		$("#alertError").hide();

		// Form validation-------------------
		var status = validateNoticeForm();
		if (status != true)
		{
			$("#alertError").text(status);
			$("#alertError").show();
			return;
		}

		var type = ($("#hidNoticeIDSave").val() == "") ? "POST" : "PUT";

		$.ajax(
		{
			url : "NoticesAPI",
			type : type,
			data : $("#formNotice").serialize(),
			dataType : "text",
			complete : function(response, status)
			{
				onNoticeSaveComplete(response.responseText, status);
			}
		});
});

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
		$("#hidNoticeIDSave").val($(this).closest("tr").find('#hidNoticeIDUpdate').val());
		$("#noticeDate").val($(this).closest("tr").find('td:eq(0)').text());
		$("#noticeTitle").val($(this).closest("tr").find('td:eq(1)').text());
		$("#noticeArea").val($(this).closest("tr").find('td:eq(2)').text());
		$("#noticeDesc").val($(this).closest("tr").find('td:eq(3)').text());
});

// CLIENT-MODEL================================================================
function validateNoticeForm()
{
		// Date
		if ($("#noticeDate").val().trim() == "")
		{
			return "Insert Notice Date.";
		}
		
		// Title
		if ($("#noticeTitle").val().trim() == "")
		{
			return "Insert Notice Title.";
		}
		
		// Area-------------------------------
		if ($("#noticeArea").val().trim() == "")
		{
			return "Insert Notice Area.";
		}

		// DESCRIPTION------------------------
		if ($("#noticeDesc").val().trim() == "")
		{
			return "Insert Notice Description.";
		}

		return true;
}

function onNoticeSaveComplete(response, status)
{
	if (status == "success")
	{
	 	var resultSet = JSON.parse(response);
	 	if (resultSet.status.trim() == "success")
	 	{
		 	$("#alertSuccess").text("Successfully saved.");
			 $("#alertSuccess").show();
		 	$("#divProjectsGrid").html(resultSet.data);
		} 
	 	else if (resultSet.status.trim() == "error")
	 	{
		 	$("#alertError").text(resultSet.data);
		 	$("#alertError").show();
	 	}
	} 
	else if (status == "error")
	{
		 $("#alertError").text("Error while saving.");
		 $("#alertError").show();
	} 
	else
	{
		 $("#alertError").text("Unknown error while saving..");
		 $("#alertError").show();
	}
	
	 
	 $("#hidNoticeIDSave").val("");
	 $("#formNotice")[0].reset();
}

// REMOVE==========================================
$(document).on("click", ".btnRemove", function(event)
{
	$.ajax(
	{
		url : "NoticesAPI",
		type : "DELETE",
		data : "noticeID=" + $(this).data("noticeid"),
		dataType : "text",
		complete : function(response, status)
		{
			onNoticeDeleteComplete(response.responseText, status);
		}
	});
});

function onNoticeDeleteComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);

		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			
			$("#divNoticesGrid").html(resultSet.data);
		} 
		else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} 
	else if (status == "error")
	{
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} 
	else
	{
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

