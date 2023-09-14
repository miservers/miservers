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
 * See : https://activemq.apache.org/hello-world
 * 
 * Run :
 * 		mvn  compile exec:java -Dexec.mainClass="com.mqlab.QueueConsumer"
 */
public class QueueConsumer 
{
	private static String url = "tcp://192.168.56.103:61616";
    
    public static void main( String[] args ) throws Exception
    {
        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory(url);

        Connection connection = connectionFactory.createConnection();
        connection.start();

        Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);

		Destination destination = session.createQueue("TEST.QUEUE1");
		
		MessageConsumer consumer = session.createConsumer(destination);

		// Wait for a message
		Message message = consumer.receive(1000);

		if (message instanceof TextMessage) {
			TextMessage textMessage = (TextMessage) message;
			String text = textMessage.getText();
			System.out.println("Received: " + text);
		} else {
			System.out.println("Received: " + message);
		}
		
		// Clean up
        session.close();
        connection.close();
	} 
}
