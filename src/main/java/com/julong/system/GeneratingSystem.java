package com.julong.system;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.minidev.json.JSONValue;
import sso.sys.pojo.EpaperSysPlatSystem;
import sso.sys.pojo.EpaperSysPlatform;
import sso.util.EhcacheCommon;

public class GeneratingSystem extends HttpServlet {

   
	/**
	 * 
	 */
	private static final long serialVersionUID = -5476537284355561447L;

	public void destroy() {
		super.destroy();
	}


	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doPost(request, response);
	
	}
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		EpaperSysPlatform currentplatform=EhcacheCommon.getSystemPlatform();
		Map<String, String> systemmap=new HashMap<String, String>();
		if(currentplatform!=null) {
			List<EpaperSysPlatSystem> systemlist=EhcacheCommon.getPlatSystemByPlatform(currentplatform.getPlatform());
			if(systemlist!=null) {
				for (EpaperSysPlatSystem epaperSysPlatSystem : systemlist) {
					systemmap.put(epaperSysPlatSystem.getIdentifier(), epaperSysPlatSystem.getSystemdomain());
				}
			}
			
		}
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().write("var system="+JSONValue.toJSONString(systemmap));
	}
		
	/**
	 * Initialization of the servlet. <br>
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {

	}

}