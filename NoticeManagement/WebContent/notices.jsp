<%@page import="model.Notice"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Notice Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/notices.js"></script>
</head>
<body>

<div class="container"><div class="row"><div class="col-8">

				<h1 class="m-3">Notice Management</h1>

				<form id="formNotice" name="formNotice">
					Notice Date:
					<input id="noticeDate" name="noticeDate" type="text"
									class="form-control form-control-sm">
					
					<br> Notice Title:
					<input id="noticeTitle" name="noticeTitle" type="text"
									class="form-control form-control-sm">
					
					<br> Notice Area:
					<input id="noticeArea" name="noticeArea" type="text"
									class="form-control form-control-sm">
					
					<br> Notice Description:
					<input id="noticeDesc" name="noticeDesc" type="text"
									class="form-control form-control-sm">
					
					<br>
					<input id="btnSave" name="btnSave" type="button" value="Save"
									class="btn btn-primary">
					<input type="hidden" id="hidNoticeIDSave" name="hidNoticeIDSave" value="">
				</form>
		
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				
				<br>
				<div id="divNoticesGrid">
					<%
						Notice noticeObj = new Notice();
						out.print(noticeObj.readNotices());
					%>
				</div>

</div> </div> </div>
</body>
</html>