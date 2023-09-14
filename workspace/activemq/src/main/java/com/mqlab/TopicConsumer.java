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
import javax.jms.MessageListener;

/**
 * See : https://activemq.apache.org/hello-world
 * 
 * Run :
 * 		mvn  compile exec:java -Dexec.mainClass="com.mqlab.TopicConsumer"
 */
public class TopicConsumer 
{
	private static String url = "tcp://192.168.56.103:61616";
    
    public static void main( String[] args ) throws Exception
    {
        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory(url);

        Connection connection = connectionFactory.createConnection();
        connection.start();

        Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);

		//Destination destination = session.createQueue("TEST.QUEUE1");
		Destination destination = session.createTopic("TEST.TOPIC1");

		MessageConsumer consumer = session.createConsumer(destination);

		consumer.setMessageListener(new HelloMessageListener());

	} 

	private static class HelloMessageListener implements MessageListener {

        @Override
        public void onMessage(Message message){
            TextMessage textMessage = (TextMessage) message;
            try{
				System.out.println("Consumer " + Thread.currentThread().getName() + 
							" received message: " + textMessage.getText());
			} catch(Exception e){
				e.printStackTrace();
			}

        }
        
    }
}
