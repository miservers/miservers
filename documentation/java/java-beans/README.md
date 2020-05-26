### Java Beans
To be used with Jsp, a Bean must have:
 - a Public Non-Parameter Constructor
 - public getters/setters

### JSP taglibs

**jsp:useBean** : locate or instanciate a Bean, depending on the scope.

~~~
<jsp:useBean id="patient" class="org.beans.Patient" scope="page"/>
~~~

 
**jsp:setProperty** : auto populate Patient Bean with incoming request values:
 
~~~jsp
<jsp:setProperty name="patient" property="*"/>
~~~
 
### JSP implicit Objects

**request** : implicite HttpServletRequest object created for each page request by the web container. you can access it from the .jsp 

~~~
<% String gender = request.getParameter("gender");
   out.println(gender);%>
~~~

**response** : implicit HttpServletResponse object, created for each request.

~~~
<% response.sendRedirect("http://www.google.fr");%>
~~~

### JSTL (JSP Standard Tag Library)





### Errors
- c:out will not work if web.xml is declaring Servlet 2.3. so take the later 3.1.


















