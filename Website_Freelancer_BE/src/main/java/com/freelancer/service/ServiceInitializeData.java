package com.freelancer.service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class ServiceInitializeData {
    @Autowired
    private DataSource dataSource;

    public void runSqlFile(String fileName) {
        try (Connection conn = dataSource.getConnection()) {
            ScriptUtils.executeSqlScript(conn, new ClassPathResource(fileName));
            System.out.println("Đã chạy file SQL: " + fileName);
        } catch (Exception e) {
            System.err.println("Lỗi khi chạy file SQL: " + fileName);
            e.printStackTrace();
        }
    }

    @Transactional
    public void clearAllTables(String databaseName) {
        try (Connection connection = dataSource.getConnection();
                Statement queryStmt = connection.createStatement();
                Statement execStmt = connection.createStatement()) {

            ResultSet rs = queryStmt.executeQuery(
                    "SELECT table_name FROM information_schema.tables " +
                            "WHERE table_schema = '" + databaseName + "' AND table_type = 'BASE TABLE'");

            execStmt.execute("SET FOREIGN_KEY_CHECKS = 0");

            List<String> tableNames = new ArrayList<>();
            while (rs.next()) {
                tableNames.add(rs.getString("table_name"));
            }

            for (String tableName : tableNames) {
                execStmt.execute("DELETE FROM `" + tableName + "`");
                execStmt.execute("ALTER TABLE `" + tableName + "` AUTO_INCREMENT = 1");
            }

            execStmt.execute("SET FOREIGN_KEY_CHECKS = 1");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
