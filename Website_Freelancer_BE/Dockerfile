FROM openjdk:21-jdk-slim

WORKDIR /app

# Cài đặt các công cụ cần thiết và dọn dẹp để giảm kích thước image
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        netcat-openbsd \
        default-mysql-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy file jar và script vào container
COPY target/Freelancer-0.0.1-SNAPSHOT.jar app.jar
COPY wait-for-mysql.sh .

# Cấp quyền thực thi cho script
RUN chmod +x wait-for-mysql.sh

EXPOSE 8080

# Chạy script để đợi MySQL sẵn sàng trước khi khởi động app
CMD ["./wait-for-mysql.sh", "172.18.0.1", "3306", "root", "123456", "java", "-jar", "app.jar"]
