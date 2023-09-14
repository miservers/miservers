package com.mqlab;

import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.Connection;
import javax.jms.DeliveryMode;
import javax.jms.Destination;
import javax.jms.ExceptionListener;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;
/**
 * See: https://activemq.apache.org/hello-world
 * 
 * Run :
 * 		mvn  compile exec:java -Dexec.mainClass="com.mqlab.Producer"
 * 
 * You can change the queueType in the code to send the message 
 * to the either a Queue or a Topic.
 */
public class Producer 
{
	private static String url = "tcp://192.168.56.103:61616";
    public static QueueType queueType = QueueType.TOPIC; // QueueType.TOPIC if topic

    public static void main( String[] args ) throws Exception
    {
        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory(url);

        Connection connection = connectionFactory.createConnection();
        connection.start();

        Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);

        // Destination destination;
		Destination destination = null;
		if ( queueType == QueueType.QUEUE )
			destination = session.createQueue("TEST.QUEUE1");
		else if ( queueType == QueueType.TOPIC )
			destination = session.createTopic("TEST.TOPIC1");

        MessageProducer producer = session.createProducer(destination);
        producer.setDeliveryMode(DeliveryMode.PERSISTENT);

        // Create a messages
        String text = "Hello T! From: " + Thread.currentThread().getName() ;
        TextMessage message = session.createTextMessage(text);

        // Tell the producer to send the message
        System.out.println("Sent message: "+ message.hashCode() + " : " + Thread.currentThread().getName());
        producer.send(message);

        // Clean up
        session.close();
        connection.close();
	}
	
	private enum QueueType {QUEUE, TOPIC};
	
}
