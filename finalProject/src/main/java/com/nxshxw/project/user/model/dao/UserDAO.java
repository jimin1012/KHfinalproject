package com.nxshxw.project.user.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nxshxw.project.user.model.dto.User;

@Repository
public class UserDAO {
	
	@Autowired // 등록된 Bean 중에서 SqlSessionTemplate 타입을 주입
	private SqlSessionTemplate sqlSession;

	/** 회원가입
	 * @param inputUser
	 * @return result
	 */
	public int signUp(User inputUser) {
		return sqlSession.insert("userMapper.signUp", inputUser);
	}

	/** 아이디 중복 검사
	 * @param id
	 * @return
	 */
	public int checkId(String id) {
		return sqlSession.selectOne("userMapper.checkId", id);
	}
	
	/** 닉네임 중복 검사
	 * @param nickName
	 * @return
	 */
	public int checkNickName(String nickName) {
		return sqlSession.selectOne("userMapper.checkNickName", nickName);
	}
	
	/** 이메일 중복 검사
	 * @param email
	 * @return count 
	 */
	public int checkEmail(String email) {
		return sqlSession.selectOne("userMapper.checkEmail", email);
	}


	/** 로그인 DAO
	 * @param user
	 * @return user
	 */
	public User login(User user) {
		return sqlSession.selectOne("userMapper.login",user);
	}


	/** sns 로그인 하기위해 이미 있는 계정인지체크
	 * @param email
	 * @return
	 */
	public User selectSnsUser(String email) {
		return sqlSession.selectOne("userMapper.selectSnsUser",email);
	}

	public int updateBoss(User inputUser) {
		return sqlSession.insert("userMapper.insertBoss", inputUser);
	}

	public int updateAcc(User inputUser) {
		return sqlSession.insert("userMapper.insertAcc", inputUser);
	}

	public int updateUserAuthority(User updateUser) {
		return sqlSession.update("userMapper.updateUserAuthority", updateUser);
	}

	/** sns 로그인
	 * @param user
	 * @return
	 */
	public User snsLogin(User user) {
		return sqlSession.selectOne("userMapper.snsLogin",user);
	}

	/** 휴대폰 중복 검사
	 * @param tel
	 * @return
	 */
	public int checkTel(String tel) {
		return sqlSession.selectOne("userMapper.checkTel", tel);
	}

	/** 사업자 번호 중복검사
	 * @param bossNo
	 * @return
	 */
	public int checkBossNo(String bossNo) {
		return sqlSession.selectOne("userMapper.checkBossNo", bossNo);
	}

	

	
	

	/** 회원 전환 정보 입력(일반회원 -> 사업자 회원)
	 * @param updateUser
	 * @return
	 */
//	public int changeAuthKey(User updateUser) {
//		return sqlSession.update("userMapper.changeAuthKey", updateUser);
//	}

	
	
	// *************** 휴대폰 인증 ******************

}
