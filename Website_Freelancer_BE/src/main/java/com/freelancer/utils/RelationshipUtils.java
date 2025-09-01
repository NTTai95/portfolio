package com.freelancer.utils;

import java.util.Collection;
import java.util.function.Function;

/**
 * Utility class for safely managing bi-directional relationships in JPA entity models
 * (e.g., @OneToMany, @ManyToMany).
 */
public class RelationshipUtils {

    /**
     * Cập nhật mối quan hệ hai chiều giữa một entity (owner) và danh sách các entity liên kết
     * (targets) trong mối quan hệ @ManyToMany.
     *
     * <p>
     * Hàm sẽ:
     * <ul>
     * <li>Xóa tất cả các liên kết cũ giữa owner và các target.</li>
     * <li>Thiết lập các liên kết mới dựa trên danh sách newTargets.</li>
     * <li>Đảm bảo quan hệ hai chiều được cập nhật ở cả hai phía.</li>
     * </ul>
     *
     * @param owner Entity cha (ví dụ: Role)
     * @param newTargets Danh sách các entity mới được liên kết (ví dụ: Permissions mới)
     * @param getTargets Getter function để lấy danh sách liên kết từ owner (ví dụ:
     *        Role::getPermissions)
     * @param getOwners Getter function để lấy danh sách liên kết ngược từ target (ví dụ:
     *        Permission::getRoles)
     * @param <Owner> Kiểu của entity cha
     * @param <Target> Kiểu của entity con
     */
    public static <Owner, Target> void updateManyToMany(Owner owner, Collection<Target> newTargets,
            Function<Owner, Collection<Target>> getTargets,
            Function<Target, Collection<Owner>> getOwners) {

        Collection<Target> currentTargets = getTargets.apply(owner);

        // Xóa liên kết cũ
        for (Target target : currentTargets) {
            getOwners.apply(target).remove(owner);
        }
        currentTargets.clear();

        // Gán liên kết mới
        for (Target target : newTargets) {
            currentTargets.add(target);
            getOwners.apply(target).add(owner);
        }
    }
}
