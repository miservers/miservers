See [Controlling access for a specific user and IBM MQ client application](https://www.ibm.com/docs/en/ibm-mq/9.2?topic=issues-creating-new-chlauth-rules-users)

Log as mqm userid on the ibm mq server

	$ su - mqm

**Create this IBM Queue Manager Objects:** 
 
-  Queue Manager  DEV.QM1

		$ crtmqm DEV.QM1

- Start the QM

		$ strmqm  DEV.QM1

- Queue DEV.QUEUE1

		$ runmqsc DEV.QM1

			DEFINE QLOCAL(DEV.QUEUE1)

- Channel DEV.APP.SVRCONN 

		DEFINE CHANNEL (DEV.APP.SVRCONN) CHLTYPE(SVRCONN) DESCR('description')

- Listener

		DEFINE LISTENER(DEV.QM1.lsnr) TRPTYPE(tcp) PORT(1415) IPADDR(192.168.56.103)
    
		START LISTENER(DEV.QM1.lsnr)
    
- Grant authorisations user 

		ALTER QMGR CONNAUTH(DEV.AUTHINFO.IDPWOS)
		     DEFINE AUTHINFO(DEV.AUTHINFO.IDPWOS) +
		     AUTHTYPE(IDPWOS) +
		     FAILDLAY(10) +
		     CHCKLOCL(OPTIONAL) +
		     CHCKCLNT(REQUIRED)




		$ useradd adam -p changeit
		$ setmqaut -m DEV.QM1 -n DEV.QUEUE1 -t queue -p adam +all
		$ setmqaut -m DEV.QM1 -t qmgr -p adam +all

- refresh Security

		$ runmqsc DEV.QM1
			
			REFRESH SECURITY TYPE(CONNAUTH)


- Check Auth:

		 DISPLAY CHLAUTH(DEV.APP.SVRCONN) MATCH(RUNCHECK) CLNTUSER('y.adam') ADDRESS('192.168.56.1')
	
			AMQ9783I: Channel will run using MCAUSER('y.adam').

On the Client, send/get JMS messages

	$ mvn  compile exec:java -Dexec.mainClass="com.mqlab.JmsPut"

	$ mvn  compile exec:java -Dexec.mainClass="com.mqlab.JmsPutGet"

