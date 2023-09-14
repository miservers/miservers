
To Run the Producer

	$ mvn  compile exec:java -Dexec.mainClass="com.mqlab.Producer"

You can change the queueType in the code to send the message to the either a Queue or a Topic.


To Run the Queue Consumer

	$ mvn  compile exec:java -Dexec.mainClass="com.mqlab.QueueConsumer"

To Run the Topic Consumer

	$ mvn  compile exec:java -Dexec.mainClass="com.mqlab.TopicConsumer"


