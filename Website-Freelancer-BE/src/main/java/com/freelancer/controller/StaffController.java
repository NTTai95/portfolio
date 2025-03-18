package com.freelancer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.dto.StaffDTO;
import com.freelancer.model.Staff;
import com.freelancer.service.StaffService;

@RestController
@RequestMapping("/staffs")
public class StaffController extends EntityController<Staff, StaffDTO, Integer> {

	private static final String ID = "id";

	@Autowired
	private StaffService service;

	@Override
	@GetMapping
	public Page<StaffDTO> getPage(@RequestParam(defaultValue = "1") Integer page,
			@RequestParam(defaultValue = "10") Integer size, @RequestParam(required = false) String[] search,
			@RequestParam(defaultValue = "id,asc") String[] sort) {

		Pageable pageable = PageRequest.of(page - 1, size,
				Sort.by(sort[1].equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sort[0]));

		String fullName = "", email = "", phone = "";

		if (search != null) {
			for (int i = 0; i < search.length - 1; i += 2) {
				String key = search[i].toLowerCase().trim();
				String value = search[i + 1];

				if (key.equals("fullname")) {
					fullName = value;
				} else if (key.equals("email")) {
					email = value;
				} else if (key.equals("phone")) {
					phone = value;
				}
			}
		}

		if (fullName.equals("") && email.equals("") && phone.equals("")) {
			return service.getAll(pageable).map(e -> e.toDto());
		}
		return service.searchAndSort(fullName, email, phone, pageable).map((e) -> e.toDto());
	}

	@GetMapping("/account/{id}")
	public StaffDTO getByAccount(@PathVariable(ID) Integer id) {
		Staff staff = service.getByAccount_Id(id).orElse(null);
		return staff == null ? null : staff.toDto();
	}

}
