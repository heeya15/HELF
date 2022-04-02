package com.aisher.helf.common.model.response;

import org.springframework.http.HttpStatus;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 서버 요청에대한 기본 응답값(바디) 정의.
 */
@Getter
@Setter
@ApiModel("BaseResponseBody")
public class BaseResponseBody {
	@ApiModelProperty(name="응답 메시지", example = "정상")
	String message = null;
	@ApiModelProperty(name="응답 코드", example = "200")
	Integer statusCode = null;
	@ApiModelProperty(name="응답 코드", example = "200")
	List<String> resultList = null;

	public BaseResponseBody() {}
	
	public BaseResponseBody(Integer statusCode){
		this.statusCode = statusCode;
	}
	
	public BaseResponseBody(Integer statusCode, String message){
		this.statusCode = statusCode;
		this.message = message;
	}
	
	public static BaseResponseBody of(Integer statusCode, String message) {
		BaseResponseBody body = new BaseResponseBody();
		body.message = message;
		body.statusCode = statusCode;
		return body;
	}
	public static BaseResponseBody of(Integer statusCode, List<String> result, String message) {
		BaseResponseBody body = new BaseResponseBody();
		body.resultList = result;
		body.message = message;
		body.statusCode = statusCode;
		return body;
	}
}
