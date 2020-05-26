<%@ taglib  uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
	<title>JSTL Demo</title>
</head>
<body>

  
<c:forEach var="i" begin="1" end="10">
	<c:out value="${i}" />
</c:forEach>


<c:set var="username" scope="session" value="pingo" />

<c:out value="${username}" /> 
</body>
</html>