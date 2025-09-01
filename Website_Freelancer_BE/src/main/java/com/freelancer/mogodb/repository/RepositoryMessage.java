package com.freelancer.mogodb.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import com.freelancer.mogodb.document.Message;

public interface RepositoryMessage extends MongoRepository<Message, String> {
        List<Message> findByReceiverIdAndIsReadFalseOrderByTimestampDesc(Integer senderId);

        List<Message> findBySenderIdAndReceiverIdOrderByTimestamp(Integer senderId,
                        Integer receiverId);

        @Aggregation(pipeline = {
                        "{ '$match': { '$or': [ { 'receiverId': ?0 }, { 'senderId': ?0 } ] } }",
                        "{ '$sort': { 'timestamp': -1 } }",
                        "{ '$project': { " + "'content': 1, " + "'timestamp': 1, " + "'isRead': 1, "
                                        + "'isRecall': 1, " + "'receiverId': 1, "
                                        + "'senderId': 1, "
                                        + "'otherUser': { '$cond': [ { '$eq': [ '$senderId', ?0 ] }, '$receiverId', '$senderId' ] }, "
                                        + "'_id': 1 } }",
                        "{ '$group': { " + "'_id': '$otherUser', "
                                        + "'messageId': { '$first': '$_id' }, "
                                        + "'lastMessage': { '$first': '$content' }, "
                                        + "'lastIsRecall': { '$first': '$isRecall' }, "
                                        + "'lastTime': { '$first': '$timestamp' }, "
                                        + "'lastSenderId': { '$first': '$senderId' }, "
                                        + "'unreadCount': { '$sum': { '$cond': [ { '$and': [ { '$eq': ['$isRead', false] }, { '$eq': ['$receiverId', ?0] } ] }, 1, 0 ] } } "
                                        + "} }",
                        "{ '$sort': { 'lastTime': -1 } }"})
        List<Map<String, Object>> findConversations(Integer userId);



        @Aggregation(pipeline = {"{ '$match': { 'senderId': ?0, 'timestamp': { $lt: ?1 } } }",
                        "{ '$sort': { 'timestamp': -1 } }",
                        "{ '$group': { " + "'_id': '$receiverId', "
                                        + "'messageId': { '$first': '$_id' }, "
                                        + "'lastMessage': { '$first': '$content' }, "
                                        + "'lastTime': { '$first': '$timestamp' }, "
                                        + "'unreadCount': { '$sum': { '$cond': [ { '$eq': ['$isRead', false] }, 1, 0 ] } } "
                                        + "} }",
                        "{ '$sort': { 'lastTime': -1 } }", "{ '$limit': 30 }"})
        List<Map<String, Object>> findConversationsBySenderBefore(Integer senderId,
                        LocalDateTime before);

        @Query("""
                            {
                              $or: [
                                 { senderId: ?0, receiverId: ?1 },
                                 { senderId: ?1, receiverId: ?0 }
                              ]
                            }
                        """)
        List<Message> findConversation(Integer user1, Integer user2, Pageable pageable);

        List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestampAsc(
                        Integer senderId, Integer receiverId, Integer senderId2,
                        Integer receiverId2);

        @Query(value = """
                        {
                            "$and": [
                                { "timestamp": { "$lt": ?2 } },
                                {
                                    "$or": [
                                        { "senderId": ?0, "receiverId": ?1 },
                                        { "senderId": ?1, "receiverId": ?0 }
                                    ]
                                }
                            ]
                        }
                        """)
        List<Message> findHistory(Integer userId, Integer receiverId, long timestamp,
                        Pageable pageable);


}
