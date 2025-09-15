package com.daniel.ecommerce.auth.repository;

import com.daniel.ecommerce.auth.entity.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserAddressRepository extends JpaRepository<UserAddress, UUID> {

    List<UserAddress> findAllByUser_Id(UUID userId);

    int countUserAddressByUser_Id(UUID userId);
}
