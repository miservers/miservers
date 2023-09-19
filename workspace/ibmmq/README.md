Create this IBM Queue Manager Objects: 
 
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
    
- Authentication user 

ALTER QMGR CONNAUTH(DEV.AUTHINFO.IDPWOS)
	     DEFINE AUTHINFO(DEV.AUTHINFO.IDPWOS) +
	     AUTHTYPE(IDPWOS) +
	     FAILDLAY(10) +
	     CHCKLOCL(OPTIONAL) +
	     CHCKCLNT(REQUIRED)

$ useradd app -p changeit -g mqm
$ setmqaut -m DEV.QM1 -n DEV.* -t q -p app +all


$ mvn  compile exec:java -Dexec.mainClass="com.mqlab.JmsPut"
