package com.ipn.esca.serviciosocial.sb;
 
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.ipn.esca.serviciosocial.bs.ProfesorServiceLocal;
import com.ipn.esca.serviciosocial.bs.ProfesorServiceRemote;
import com.ipn.esca.serviciosocial.dao.ProfesorDAO;
import com.ipn.esca.serviciosocial.entities.Profesor;
 
@Stateless
public class ProfesorServiceBean implements ProfesorServiceLocal, ProfesorServiceRemote{
  
	@EJB(lookup="java:module/ProfesorDAOBean!com.ipn.esca.serviciosocial.dao.ProfesorDAO")
	private ProfesorDAO service;
	
	
	
	
	@Override
	public List<Profesor> getProfesoresByFilter(Profesor filter) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public List<Profesor> getProfesoresByFilter(String filterProfessor) {
		return service.getProfesoresByFilter(filterProfessor);
	}


	
 
}