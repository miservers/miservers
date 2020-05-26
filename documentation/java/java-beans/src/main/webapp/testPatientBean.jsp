<jsp:useBean id="patient" class="org.beans.Patient" scope="page"/>
<jsp:setProperty name="patient" property="*"/>

<html>
    <body>
        First Name: <jsp:getProperty name="patient" property="firstName"/><br/>
        Gender    : <jsp:getProperty name="patient" property="gender"/><br/>
        <br/>
        <form name="beanTest" method="GET" action="testPatientBean.jsp">
            First Name: <input type="text" name="firstName" size="20"><br/>
            Choose an option:
            <select name="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select><br/>
            <input type="submit" value="Test the Bean">
        </form>
    </body>
</html>