package com.nxshxw.project.common.aop;

import org.aspectj.lang.annotation.Pointcut;

public class CommonPointcut {
	
	@Pointcut("execution(* com.nxshxw.project..*Impl*.*(..))")
	public void ServiceImplPointcut() {
		
	}
}

