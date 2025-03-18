package com.freelancer.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.freelancer.dto.FreelancerDTO;
import com.freelancer.dto.ProfileDTO;
import com.freelancer.model.Account;
import com.freelancer.model.Freelancer;
import com.freelancer.model.Profile;
import com.freelancer.service.ProfileService;

@RestController
@RequestMapping("/profiles")
public class ProfileController
		extends
			EntityController<Profile, ProfileDTO, Integer> {

	private static final String ID = "id";

	private static final String IMAGE = "image";

	@Autowired
	private ProfileService service;

	@Autowired
	private Cloudinary cloudinary;

	@GetMapping("/account")
	public ProfileDTO getByAccount(@RequestBody Account account) {
		return service.getByAccount_Id(account.getId()).orElse(null).toDto();
	}

	@GetMapping("/account/{id}")
	public ProfileDTO getByAccount(@PathVariable(ID) Integer id) {
		Profile profile = service.getByAccount_Id(id).orElse(null);
		return profile == null ? null : profile.toDto();
	}

	@GetMapping("/recruiter/{id}")
	public ProfileDTO getByRecruiter(@PathVariable(ID) Integer id) {
		Profile profile = service.getByRecruiter_Id(id).orElse(null);
		return profile == null ? null : profile.toDto();
	}

	@PatchMapping("/{id}/image")
	public ProfileDTO updateImage(@PathVariable("id") Integer id,
			@RequestParam("image") MultipartFile image) {
		Profile profile = service.getById(id).orElse(null);
		if (profile == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"Profile không tồn tại");
		}

		try {
			String publicId = "profile_" + id;

			Map<?, ?> uploadResult = cloudinary.uploader()
					.upload(image.getBytes(), ObjectUtils.asMap("public_id",
							publicId, "overwrite", true));

			profile.setAvatar(uploadResult.get("url").toString());
			return service.add(profile).toDto();
		} catch (IOException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
					"Lỗi tải ảnh", e);
		}
	}

	@GetMapping("/freelancers")
	public Page<ProfileDTO> getHaveFreelance(
			@RequestParam(defaultValue = "1") Integer page,
			@RequestParam(defaultValue = "10") Integer size,
			@RequestParam(required = false) String[] search,
			@RequestParam(required = false) String[] sort) {

		Pageable pageable = PageRequest.of(--page, size,
				Sort.by(Sort.Direction.ASC, "id"));

		String fullName = "";

		if (search != null) {
			for (int i = 0; i < search.length - 1; i += 2) {
				String key = search[i].toLowerCase().trim();
				String value = search[i + 1];

				if (key.equals("fullname")) {
					fullName = value;
				}
			}
		}

		return service.getByFreelancerIdNotNull(fullName, pageable)
				.map((e) -> e.toDto());

	}

	@GetMapping("/freelancer/{id}")
	public ProfileDTO getMethodName(@PathVariable Integer id) {
		Profile profile = service.getByFreeLancer_Id(id).orElse(null);
		return profile == null ? null : profile.toDto();
	}
}
