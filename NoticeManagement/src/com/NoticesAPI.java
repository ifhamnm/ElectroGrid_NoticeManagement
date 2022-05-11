package com;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import model.Notice;

@WebServlet("/NoticesAPI")
public class NoticesAPI extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
	Notice noticeObj = new Notice();
	
    public NoticesAPI() {
    	
        super();
    }

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
						throws ServletException, IOException
	{
				String output = noticeObj.insertNotice(
									request.getParameter("noticeDate"),
									request.getParameter("noticeTitle"),
									request.getParameter("noticeArea"),
									request.getParameter("noticeDesc"));
				
				response.getWriter().write(output);
	}
	
	// Convert request parameters to a Map
	private static Map getParasMap(HttpServletRequest request)
	{
				Map<String, String> map = new HashMap<String, String>();
				try
				{
					Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
					String queryString = scanner.hasNext() ?
										scanner.useDelimiter("\\A").next() : "";
					scanner.close();
	
					String[] params = queryString.split("&");
					for (String param : params)
					{
						String[] p = param.split("=");
						map.put(p[0], p[1]);
					}
				}
				catch (Exception e)
				{
				}
				return map;
	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response)
						throws ServletException, IOException
	{
			Map paras = getParasMap(request);
			
			String output = noticeObj.updateNotice(paras.get("hidNoticeIDSave").toString(),
								paras.get("noticeDate").toString(),
								paras.get("noticeTitle").toString(),
								paras.get("noticeArea").toString(),
								paras.get("noticeDesc").toString());
			
			response.getWriter().write(output);
	}
			
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
						throws ServletException, IOException
	{
			Map paras = getParasMap(request);
			
			String output = noticeObj.deleteNotice(paras.get("noticeID").toString());
			
			response.getWriter().write(output);
	}

}
