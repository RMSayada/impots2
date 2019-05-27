function trim(s) {
	return s.replace(/(^\s+)|(\s+$)/g, "");
}

function hasClassName(oNode, className) {
	if (!oNode)
		return false;
		return (oNode.nodeType==1)?((" "+oNode.className+" ").indexOf(" "+className+" ")!=-1):false;
}

function addClassName(oNode,className) {
	if (!oNode)
		return;
	if ((oNode.nodeType==1) && !hasClassName(oNode,className))
		oNode.className = trim(oNode.className+" "+className);
}

function deleteClassName(oNode,className) {
	if (!oNode)
		return;
	if (oNode.nodeType==1 && hasClassName(oNode,className))
		oNode.className = trim((" "+oNode.className+" ").replace(" "+className+" "," "));
}

function NoError3S () {
	var nomChamps = ['spi','teledec','rfr'];
	var msg = document.getElementById('message_error');
	if (msg) { addClassName(msg, 'pasvisible'); }

	msg = document.getElementById('timeout_error');
	if (msg) { addClassName(msg, 'pasvisible'); }

	addClassName(document.getElementById('saisie_obligatoire_texte'), 'pasvisible');
	addClassName(document.getElementById('saisie_obligatoire_error'), 'pasvisible');

	for  (i=0; i<=2; i++)
		{
			document.getElementById(nomChamps[i]+'_tmp').value='';
			addClassName(document.getElementById(nomChamps[i]+'_error'), 'pasvisible');
			deleteClassName(document.getElementById(nomChamps[i]+'_tmp'), 'border_error');
			addClassName(document.getElementById(nomChamps[i]+'_img_error'), 'pasvisible');
		}
	return;
}
// -------------------------------------------------------------------------------------------------
function oubliNumFiscal()
	{
		var nomChamps = ['email','captchaTextPwd'];
		var isErreur = false;
		var compteurErreur = 0;
		$("#champsObligatoire").remove();
		for (i=0; i<=1; i++)
		{
			if (!document.getElementById(nomChamps[i]) || document.getElementById(nomChamps[i]).value=='')
				{
						isErreur = true;
					compteurErreur++;
				}
		}
		if (isErreur)
			{
				document.getElementById('CAT2OubliFisc').innerHTML = 'La saisie de l\'ensemble des champs est obligatoire.';
				deleteClassName(document.getElementById('CAT2OubliFisc'),"pasvisible");
				return false;
			}
		document.getElementById('oubliNumFiscalForm').submit();;
	};

// -------------------------------------------------------------------------------------------------
function oubliMotDePasse()
	{
		var nomChamps = ['numfisc','captchaTextFisc'];
		var isErreur = false;
		var compteurErreur = 0;
		var longueurChamps = ["13"];
		var typeChamps = ['N'];
		var chiffres = "0-9" ;
		var lettres = "a-zA-Z";
		var alpha = "0-9a-zA-Z" ;
		var special="#\$\!%&\*\+-\/=\?\^_\'\.\{\}\|" ;
		var testContenu;
		// Verification existence saisie pour tous les champs
		$("#champsObligatoire").remove();
		for (i=0; i<=1; i++)
		{
			if (!document.getElementById(nomChamps[i]) || document.getElementById(nomChamps[i]).value=='')
				{
						isErreur = true;
					compteurErreur++;
				}
		}
		if (isErreur)
			{
				document.getElementById('CAT2OubliMotDePasse').innerHTML = 'La saisie de l\'ensemble des champs est obligatoire.';
				deleteClassName(document.getElementById('CAT2OubliMotDePasse'),"pasvisible");
				return false;
			}
		// Test format uniquement sur le champs 1
		for (i=0; i<1; i++)
			{
				if (typeChamps[i]=='N')
					{
						Expression = new RegExp("^[0-9]{"+longueurChamps[i]+"}$");
						testContenu=Expression.test(document.getElementById(nomChamps[i]).value);
					}
				else
					{
					if (typeChamps[i]=='A')
						{
							Expression = new RegExp("^["+alpha+special+"]"+"{"+longueurChamps[i]+"}$");
							Expression2 = new RegExp("^.*["+lettres+"].*$");
							Expression3 = new RegExp("^.*["+chiffres+"].*$");
							testContenu=Expression.test(document.getElementById(nomChamps[i]).value) && Expression2.test(document.getElementById(nomChamps[i]).value) && Expression3.test(document.getElementById(nomChamps[i]).value) ;
						}
					}
			}
			if (!testContenu )
				{
					isErreur = true;
					document.getElementById('CAT2OubliMotDePasse').innerHTML = 'Le num&eacute;ro fiscal saisi est incorrect ; veuillez recommencer';
					deleteClassName(document.getElementById('CAT2OubliMotDePasse'),"pasvisible");
					return false ;
				}
			else
				{
					document.getElementById('oubliMotDePasseForm').submit();;
				}
		};
//--------------------------------------------------------------------------------------
function NoError() {
	// Le contour rouge (si defaut bootstrap) du champs en erreur . par sur l'input
	$('.form-group').removeClass('has-error');
	// Le(s) message(s) d'erreur de categorie 1 relatif(s) a chaque champs
	$('.cat1').html('').addClass('hide');
	// Le(s) message(s) d'erreur de categorie 2 "globaux"
	$('.cat2').html('').addClass('hide');
	$('.form-group').removeAttr('aria-labelledby');
}
//--------------------------------------------------------------------------------------
function erreurEtVideChamps(leChamps) {
		prefixe='fg_';
		suffixe='_tmp';
		$('#'+prefixe+leChamps).addClass('has-error');
		$('#'+leChamps+suffixe).val('');
}

//--------------------------------------------------------------------------------------
function erreurEtGardeChamps(leChamps) {
		prefixe='fg_';
		suffixe='_tmp';
		$('#'+prefixe+leChamps).addClass('has-error');
		// $('#'+leChamps+suffixe).val(''); //
}

//--------------------------------------------------------------------------------------
function obligatoire(leChamps) {
	if ($("#"+leChamps+"_tmp").val().length==0) {
		$('#fg_'+leChamps).addClass('has-error');
   	$("#"+leChamps).attr("aria-labelledby","erreur");
		return(false)
	}
	return(true);
}
//--------------------------------------------------------------------------------------
function estVide(leChamps) {
	if ($("#"+leChamps+"_tmp").val().length==0) {
		return(true)
	}
	return(false);

}
//--------------------------------------------------------------------------------------
function exactement(leChamps,longueur,message) {
	if ($("#"+leChamps+"_tmp").val().length!=longueur) {
	$('#fg_'+leChamps).addClass('has-error');
	$('#Cat1_'+leChamps).html(message).removeClass('hide').addClass('alert alert-danger');
   $("#"+leChamps).attr("aria-describedby","Cat1_"+leChamps);
		return(false)
	}
	return(true);
}



//--------------------------------------------------------------------------------------
function verifiePWD(leChamps,longueurMini,longueurMaxi,message){
	var chiffres = "0-9" ;
	var lettres = "a-zA-Z";
	var alpha = "0-9a-zA-Z" ;
	var special="#\$\!%&\*\+-\/=\?\^_\'\.\{\}\|" ;
	var testContenu;
	Expression = new RegExp("^["+alpha+special+"]"+"{"+longueurMini+","+longueurMaxi+"}$");
	Expression2 = new RegExp("^.*["+lettres+"].*$");
	Expression3 = new RegExp("^.*["+chiffres+"].*$");
	aTester=$("#"+leChamps+"_tmp").val();
	debutRetourLog='\tControle du mot  de passe ' + aTester + ' avec  : ' + Expression + ' et ' + Expression2 + ' et '+ Expression3 ;
	if(aTester) {
		if (!(Expression.test(aTester) && Expression2.test(aTester) && Expression3.test(aTester))) {
			$('#fg_'+leChamps).addClass('has-error');
			$('#Cat1_'+leChamps).html(message).removeClass('hide text-center').addClass('alert alert-danger');
			return(false);
		}
		return(true);

	}
}
//
//
//--------------------------------------------------------------------------------------
function verifieDate(leChamps,message,minimum){
	//Au viveau de la saisie, on n'a verifie uniquement qu'il n'y avait que des valeurs numériques et des /
	  // on vient de vérifier la longueur.
	  // Verif N°1 : regex
		aTester=$("#"+leChamps+"_tmp").val();
		bad=0;
	  var regexpBonneDate=/^(\d{2}\/){2}\d{4}$/;
		if(!regexpBonneDate.test(aTester)) {
			bad=1;
		}
		else {
			var date_temp = aTester.split('/');
			date_temp[1] -=1;
			var ma_date = new Date();
			ma_date.setFullYear(date_temp[2]);
			ma_date.setMonth(date_temp[1],date_temp[0]);
			//ma_date.setDate(date_temp[0]);
			if(!(ma_date.getFullYear()==date_temp[2] && ma_date.getMonth()==date_temp[1] && ma_date.getDate()==date_temp[0])){
				bad=1;
			}
			else {
				maintenant=new Date();
				jeanne=minimum.split('/');
				calmant=new Date(jeanne[2],jeanne[1]-1,jeanne[0]);
				if (ma_date > maintenant) {
					bad=1;
				}		
				else  {
					if (ma_date < calmant) {
						bad=1;
					}	
				}
			}
		}
		if(bad) {
			$('#fg_'+leChamps).addClass('has-error');
			$('#Cat1_'+leChamps).html(message).removeClass('hide text-center').addClass('alert alert-danger');
			return(false);
		}
		return(true);
}

//--------------------------------------------------------------------------------------
function auMoins(leChamps,longueur,message) {
	if ($("#"+leChamps+"_tmp").val().length<longueur) {
	$('#fg_'+leChamps).addClass('has-error');
	$('#Cat1_'+leChamps).html(message).removeClass('hide').addClass('alert alert-danger');
		return(false)
	}
	return(true);
}
//--------------------------------------------------------------------------------------
function videChamps(leFormulaire,leSuffixe) {
		var aVider = Array.prototype.slice.call(arguments, 2);
    $("[name='"+leFormulaire+"']").find('input:hidden').each(function(index,unChamps) {
			if (aVider.indexOf($(unChamps).attr('name')) > -1) {
					source=$(unChamps).attr('name')+leSuffixe;
					$("[name='"+source+"']").val('');
					$(unChamps).val('');


			}
    });
}
//--------------------------------------------------------------------------------------
function switchEtVideChamps(leFormulaire,leSuffixe) {
		var aSwitcher = Array.prototype.slice.call(arguments, 2);
    $("[name='"+leFormulaire+"']").find('input:hidden').each(function(index,unChamps) {
			if (aSwitcher.indexOf($(unChamps).attr('name')) > -1) {
					source=$(unChamps).attr('name')+leSuffixe;
					$(unChamps).val($("[name='"+source+"']").val());
					$("[name='"+source+"']").val('');
			}
    });
}
//--------------------------------------------------------------------------------------
function reverseEtGardeChamps(leFormulaire,leSuffixe) {
		var aSwitcher = Array.prototype.slice.call(arguments, 2);
    $("[name='"+leFormulaire+"']").find('input:hidden').each(function(index,unChamps) {
			if (aSwitcher.indexOf($(unChamps).attr('name')) > -1) {
					destination=$(unChamps).attr('name')+leSuffixe;
					$("[name='"+destination+"']").val($(unChamps).val());
					//$(unChamps).val('');
			}
    });
}

//--------------------------------------------------------------------------------------
function afficheChampsenSus(leFormulaire,leChamps) {
		var suffixe="_tmp";
		var aAjouter = Array.prototype.slice.call(arguments, 2);
    $("[name='"+leFormulaire+"']").find("input[type!='hidden']").each(function(index,unChamps) {
			if ($(unChamps).attr('name')==leChamps+suffixe) {
				}
			else {
						if (aAjouter.indexOf($(unChamps).attr('name').replace(suffixe,"")) > -1) {
							$(unChamps).parents('.form-group').removeClass('hide');
						}
						else {
							$(unChamps).parents('.form-group').addClass('hide');
						}
			 } 
    });
}
function donneFocus(leFormulaire,leChamps,leSuffixe) {
	var suffixe="";
   if (typeof leSuffixe === 'undefined' ) {
		suffixe="_tmp";
	}
	else
		if(leSuffixe!="none") {
		suffixe=leSuffixe;
	}
    $("[name='"+leFormulaire+"']").find("input[type!='hidden']").each(function(index,unChamps) {
			if ($(unChamps).attr('name')==leChamps+suffixe) {
					$(unChamps).focus();
					$(unChamps).focusin();
					/*$(unChamps).focus();*/
				}
    });
}


//--------------------------------------------------------------------------------------
function afficheForm(nomForm) {
	$('#formulairePrincipal').attr('name',nomForm);
	switch(nomForm) {
		case 'CTX' :
								$('#titre_authent').html('Connexion ou cr&eacute;ation de votre espace');
								//document.title="Particuliers | connexion ou création de votre espace";
								document.title=messageContenu['titreFenetre'+nomForm];
								afficheChampsenSus('CTX','spi','yapas');
								//donneFocus('CTX','spi');
								videChamps('CTX','_tmp','pwd','teledec','rfr','dateNaissance');
								urlCible=urlContexte;
								//$('#btnAction').html('Continuer').addClass('btn-primary btn-default').removeClass('btn-glow');
								$('#btnAction').addClass('btn-default').removeClass('btn-primary btn-glow').addClass('disabled').parent().attr({ 'data-original-title': 'Pour continuer, veuillez saisir votre numéro fiscal.', 'data-toggle': 'tooltip', 'data-placement': 'bottom' });
								$('#spi_tmp').on('focus', function()  {
									$('#aide_spi').attr('open', 'open');
									$('details').not('#aide_spi').removeAttr("open");
									});
								//donneFocus('CTX','spi');
										break;
		case '3S' :
								$('#titre_authent').html('Cr&eacute;ation de votre espace particulier');
								document.title=messageContenu['titreFenetre'+nomForm];
								msg='Vous devez créer votre espace en saisissant votre numéro d\'accès en ligne et votre revenu fiscal de référence.';
								messageACaractereInformatif(msg);

								afficheChampsenSus('3S','spi','teledec','rfr');
								urlCible=urlLogin3S;
								//$('#btnAction').html('Continuer').addClass('btn-primary btn-glow').removeClass('btn-default');
								$('#btnAction').html('Continuer').addClass('btn-primary btn-glow').removeClass('disabled btn-default').parent().attr('');
                                    // On masque les rubriques d'aide non pertinentes et affiche celles qui le sont
                                    $('.aideMdp, .aideSPI, .ocfiNonIR, .aideSpiPAS, .aideCode').addClass('hide').attr('aria-hidden', true);
                                    $('.aideIdentifiants').removeClass('hide').attr('aria-hidden', false);
                                    // On masque les rubriques d'aide qui seraient déjà dépliées
                                    $('details').removeAttr("open");
                                    // Et on déplie les rubriques d'aide en fonction du focus
                                    $('#rfr_tmp').on('focus', function () {
                                        $('details').not('#aide_rfr').removeAttr("open");
                                        $('#aide_rfr').attr('open', 'open');
                                    });
                                    $('#teledec_tmp').on('focus', function () {
                                        $('details').not('#aide_nael').removeAttr("open");
                                        $('#aide_nael').attr('open', 'open');
                                    });
								donneFocus('3S','teledec');
								break;
			case 'LMDP' :
								$('#titre_authent').html('Connexion à votre espace particulier');
								document.title=messageContenu['titreFenetre'+nomForm];
								afficheChampsenSus('LMDP','spi','pwd');
								urlCible=urlLoginMotDePasse;
								//$('#btnAction').html('Connexion').addClass('btn-primary btn-glow').removeClass('btn-default');
								$('#btnAction').html('Connexion').addClass('btn-primary btn-glow').removeClass('disabled btn-default').parent().attr('');
								// On masque les rubriques d'aide non pertinentes et affiche celles qui le sont
								$('.aideMdp').removeClass('hide').attr('aria-hidden', false);
								$('.aideSPI, .aideIdentifiants, .ocfiNonIR, .aideSpiPAS, .aideCode').addClass('hide').attr('aria-hidden', true);
								// Et on déplie les rubriques d'aide en fonction du focus
								$('#pwd_tmp').on('focus', function () {
									$('#aide_mdp').attr('open', 'open');
									$('details').not('#aide_mdp').removeAttr("open");
								});
							//
							// if(estVide('spi')) { 	
							//			donneFocus('LMDP','spi');
							//	}	
							//	else {
							//		donneFocus('LMDP','pwd');
							//	}
								break;

			case 'PAS' : 
									$('#titre_authent').html('Cr&eacute;ation de votre espace particulier');
									document.title="Particuliers | création de votre espace particulier";
									afficheChampsenSus('PAS','spi','dateNaissance');
									urlCible=urlLoginPAS;
									$('#btnAction').html('Continuer').addClass('btn-primary btn-glow').removeClass('disabled btn-default').parent().attr('');
									// On masque les rubriques d'aide non pertinentes
									$('.aideSPI,.aideMdp,.aideIdentifiants, .ocfiNonIR,.aideSpiPAS, .aideCode').addClass('hide').attr('aria-hidden', true);
									//$('.ocfiNonIR').removeClass('hide').attr('aria-hidden', false);
									// On déplie par défaut la rubrique d'aide relative à la perte du mot de passe
									$('#aide_ocfiNonIR').attr('open', 'open');
									$('details').not('#aide_ocfiNonIR').removeAttr("open");
									donneFocus('PAS','dateNaissance');
									break;

		}
}



//--------------------------------------------------------------------------------------
function controleFormulaireEtSubmit(verifierChangementIdentifiant,leBouton)
	{
		var leFormulaire=$(leBouton).parents('form').attr('id');
		var nomFormulaire=$(leBouton).parents('form').attr('name');
		// window.alert("Form : " + leFormulaire );
		NoError();
		nbErr=0;
		nbCat2=0;
		focusTo="";

		if (verifierChangementIdentifiant==1) {
			if ( ($('#spi').val()) && $('#spi_tmp').val() && $('#spi_tmp').val() != $('#spi').val() ) { 
				$('#formulairePrincipal').attr('action',urlContexte); $('#formulairePrincipal').attr('name','CTX');afficheForm('CTX');switchEtVideChamps('CTX','_tmp','spi'); return(true); 
			} 
		}
		switch (nomFormulaire)
			{
						// La creation du compte par la saisie des3 identifiants fiscaux
						case '3S':
   						NoError();
							if (!obligatoire('spi') ) { nbCat2++; nbErr++;  }
							else if(!exactement('spi',13, messageContenu['badFormatSpi'])) { nbErr++; }

							if (!obligatoire('teledec') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="teledec"; }
							else if(!exactement('teledec',7,'Votre numéro d\'accès en ligne comporte 7 chiffres&nbsp;;&nbsp;veuillez vérifier votre saisie.')) { nbErr++;  if(focusTo.length==0)focusTo="teledec";  }

							if (!obligatoire('rfr') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="rfr";   }

							if(nbCat2) $('#erreur').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
							if(nbErr) { if(focusTo.length!=0)donneFocus(nomFormulaire,focusTo) ; return(false) ;  } 

							switchEtVideChamps('3S','_tmp','spi','teledec','rfr');
							break;
						// ---------------------------------------------
						// L'obtention du contexte usager
						case 'CTX':
   						NoError();
							if (!obligatoire('spi') ) { nbCat2++; nbErr++;  if(focusTo.length==0)focusTo="spi"; }
							else if(!exactement('spi',13, messageContenu['badFormatSpi'])) { nbErr++; if(focusTo.length==0)focusTo="spi";}

							if(nbCat2) $('#erreur').html('Vous devez saisir votre numéro fiscal à 13 chiffres.').removeClass('alert alert-info hide').addClass('alert alert-danger text-center');
							if(nbErr) { if(focusTo.length!=0)donneFocus(nomFormulaire,focusTo) ;  return(false); }
							
							videChamps('CTX','_tmp','pwd','teledec','rfr','dateNaissance');
							switchEtVideChamps('CTX','_tmp','spi');
   						NoError();
							break;
						// ---------------------------------------------
						// L'accès par l'utilisation du compte déjà créé
						case 'LMDP':
   						NoError();
							//messageBadFormat='Le format de votre mot de passe est incorrect. Il doit comporter 8 &agrave; 128 caract&egrave;res dont une lettre et un chiffre.<br>Il peut aussi contenir les caract&egrave;res sp&eacute;ciaux suivants&nbsp;:&nbsp;! # $ % & * + - / = ? ^ _ \' . { | }.';
							if (!obligatoire('spi') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="spi" ; }
							else if(!exactement('spi',13, messageContenu['badFormatSpi'])) { nbErr++;  if(focusTo.length==0)focusTo="spi";}

							if (!obligatoire('pwd') ) { nbCat2++; nbErr++;  if(focusTo.length==0)focusTo="pwd"; }
							else if(!auMoins('pwd',8,messageContenu['badFormatPwd'])) { nbErr++;  if(focusTo.length==0)focusTo="pwd";}
								else if(!verifiePWD('pwd',8,128,messageContenu['badFormatPwd'])) { nbErr++;  if(focusTo.length==0)focusTo="pwd"; }


							if(nbCat2) $('#erreur').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
							if(nbErr) { if(focusTo.length!=0)donneFocus(nomFormulaire,focusTo) ;  return(false); }

							switchEtVideChamps('LMDP','_tmp','spi','pwd');
							break;
						// ------------------------------------------------------------------------------------
						// La création du compte par la saisie de la date de naissance si le contexte s'y prête
						case 'PAS':
   						NoError();
							if (!obligatoire('spi') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="spi";  }
							else if(!exactement('spi',13, messageContenu['badFormatSpi'])) { nbErr++; }

							if (!obligatoire('dateNaissance') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="dateNaissance"; }
							else if(!exactement('dateNaissance',10,messageContenu['badFormatDate'])) { nbErr++; if(focusTo.length==0)focusTo="dateNaissance"; }
											else if(!verifieDate('dateNaissance',messageContenu['badFormatDate'],'01/01/1905')) { if(focusTo.length==0)focusTo="dateNaissance" ; nbErr++;} 

							if(nbCat2) $('#erreur').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
							if(nbErr) { if(focusTo.length!=0)donneFocus(nomFormulaire,focusTo) ;  return(false); }
							
							switchEtVideChamps('PAS','_tmp','spi','dateNaissance');
							break;
						// ------------------------------------------------------------------------------------
						// La fonction de recuperation du mot de passe en cas d'oubli
						case 'oubliMotDePasseForm':
   						NoError();
							if (!obligatoire('numfiscal') ) { nbCat2++; nbErr++;  if(focusTo.length==0)focusTo="numfiscal";}
							else if(!exactement('numfiscal',13, messageContenu['badFormatSpi'])) { nbErr++; if(focusTo.length==0)focusTo="numfiscal"; }
							if (!obligatoire('captchaTextFisc') ) { nbCat2++; nbErr++;  if(focusTo.length==0)focusTo="captchaTextFisc";}

							if(nbCat2) $('#erreurModPwd').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
							if(nbErr) { if(focusTo.length!=0)donneFocus(nomFormulaire,focusTo) ; return(false); }

							switchEtVideChamps('oubliMotDePasseForm','_tmp','numfiscal','captchaTextFisc');
							break;
						// ------------------------------------------------------------------------------------
						// La fonction de recuperation du numero fisacl en cas d'oubli
						case 'oubliNumFiscalForm':
   						NoError();
							if (!obligatoire('email') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="email"; }
							//else if(!exactement('numfiscal',13,'Votre numéro fiscal comporte 13 chiffres&nbsp;;&nbsp;veuillez vérifier votre saisie.')) { nbErr++; }
							if (!obligatoire('captchaTextPwd') ) { nbCat2++; nbErr++;  if(focusTo.length==0)focusTo="captchaTextPwd";}

							if(nbCat2) $('#erreurModFisc').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
							if(nbErr) { if(focusTo.length!=0)donneFocus(nomFormulaire,focusTo) ; return(false); }
							if(! $('#oubliNumFiscalForm')[0].checkValidity()) {
								// If the form is invalid, submit it. The form won't actually submit;
									// this will just cause the browser to display the native HTML5 error messages.
									erreurEtGardeChamps("email");
									$('#oubliNumFiscalForm')[0].find(':submit').click();
									return(false);
							}
							switchEtVideChamps('oubliNumFiscalForm','_tmp','email','captchaTextPwd');
							break;
			}
	}
	
//--------------------------------------------------------------------------------------------------
function messageACaractereInformatif(leMessage) {
	$('#erreur').html(leMessage).removeClass('alert alert-danger hide').addClass('alert alert-info text-center');
}

//--------------------------------------------------------------------------------------------------
// Mise en place du traitement des reponses d'obtention du contexte ou de l'authentification
//--------------------------------------------------------------------------------------------------
function ecouteReponseForm()
	{
		var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
		var eventer = window[eventMethod];
		var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
		eventer(messageEvent,function(e) {
			message = e.data.split(',')[0];
			value = e.data.split(',')[1];
			switch(message) {
				case 'ctx': {
					var verifieSiLink = new RegExp(".*_LINK:[0-9]+");
					if (verifieSiLink.test(value)) {
						newValue=value.split(':')[0];
						ageLien=value.split(':')[1];
						value=newValue;
						texteValide="";
						ValidationMax=48*3600;
						ValideEncore=ValidationMax-ageLien;
						if (ValideEncore<(24*3600)) {
							nbH=parseInt(ValideEncore/3600);
							nbM=parseInt((ValideEncore-(nbH*3600))/60);
							if(nbH){texteValide=', valable '+nbH+(nbH>1 ? ' heures' : ' heure'); }
							if(nbM){texteValide=texteValide+', '+ nbM + (nbM>1 ? ' minutes' : ' minute'); }
							if(texteValide.length) texteValide+=',';
						}
					}
					if( $('#spi').val())  $('#spi_tmp').val($('#spi').val()) ;
					switch(value) {
						case 'FORMAT':
							NoError();
							$('#blocage').html('').removeClass('alert alert-info').addClass('alert alert-danger hide');
							$('#erreur').html(messageContenu['badFormatSpi']).removeClass('alert alert-info hide').addClass('alert alert-danger');
							break;
						case 'LMDP':  
							NoError();
							$('#FranceConnect').removeClass('hide');
							afficheForm('LMDP');
							break;
						case '3S_LINK':
							NoError();
							$('#FranceConnect').removeClass('hide');
							afficheForm('3S');
							msg='Vous avez déjà initié la procédure de création de votre espace particulier.<br>Vous devez cliquer sur le lien';
							msg+= texteValide;
							msg+=' qui vous a été adressé par courriel.<br>Si vous le souhaitez, vous pouvez à nouveau initier la création de votre espace en saisissant le\(s\) champ\(s\) ci-après.';
							messageACaractereInformatif(msg);
							break;
						case '3S':
							NoError();
							$('#FranceConnect').removeClass('hide');
							afficheForm('3S');
							break;
						case 'PAS_LINK':
							NoError();
							msg='Vous avez déjà initié la procédure de création de votre espace particulier.<br>Vous devez cliquer sur le lien';
							msg+= texteValide;
							msg+=' qui vous a été adressé par courriel.<br>Si vous le souhaitez, vous pouvez à nouveau initier la création de votre espace en saisissant le\(s\) champ\(s\) ci-après.';
							messageACaractereInformatif(msg);
							$('#FranceConnect').addClass('hide');
							afficheForm('PAS');
							break;
						case 'PAS':
							NoError();
							$('#FranceConnect').addClass('hide');
							afficheForm('PAS');
							break;
						case 'MPA_LINK':
							NoError();
							msg='Vous avez déjà initié la procédure de création de votre espace particulier.<br>Vous devez cliquer sur le lien';
							msg+= texteValide;
							msg+=' qui vous a été adressé par courriel.<br>Si vous le souhaitez, vous pouvez à nouveau initier la création de votre espace en saisissant le\(s\) champ\(s\) ci-après.';
							messageACaractereInformatif(msg);
							$('#FranceConnect').removeClass('hide');
							afficheForm('PAS');
						break;
					case 'MPA':
						NoError();
						$('#FranceConnect').removeClass('hide');
						afficheForm('PAS');
						break;
					case 'ERR' :
						NoError();
						$('#FranceConnect').removeClass('hide');
						$('#erreur').html('L\'application est indisponible ; veuillez réessayer ultérieurement.').removeClass('hide alert-info').addClass('alert alert-danger');
						afficheForm('CTX');
						break;
					case 'NOINFO': 
						NoError();
						$('#FranceConnect').removeClass('hide');
						//messageACaractereInformatif(messageContenu[message+'_'+value]);
						$('#erreur').html(messageContenu[message+'_'+value]).addClass('text-center alert-danger').removeClass('hide alert-info');
						$('.ocfiNonIR').removeClass('hide').attr('aria-hidden', false);
						$('#aide_ocfiNonIR').attr('open','open');
						// On masque les rubriques d'aide non pertinentes
						$('.aideSPI,.aideMdp,.aideIdentifiants, .aideCode').addClass('hide').attr('aria-hidden', true);
						break;
					case 'AMALGAME':
						
						NoError();
						msg='Vous ne pouvez pas accéder à votre espace particulier et utiliser les services en ligne ; veuillez nous en excuser.&nbsp;';
						msg+='Nous vous invitons à contacter votre  <a id="CFP" href="https://www.impots.gouv.fr/portail/contacts">centre des Finances Publiques.</a>';
						$('#erreur').html(msg).removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
						break;
					case 'EXISTEPAS':
						
						NoError();
						//messageACaractereInformatif(messageContenu[message+'_'+value]);
						$('#erreur').html(messageContenu[message+'_'+value]).removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
						// On masque les rubriques d'aide non pertinentes
						$('.aideSPI,.aideMdp,.aideIdentifiants, .ocfiNonIr, .aideCode').addClass('hide').attr('aria-hidden', true);
						erreurEtGardeChamps('spi');
						donneFocus('CTX','spi');
						break;
					default:
						var verifieSiDoublon = new RegExp("DOUBLON:[0-9]{13}");
						NoError();
						if (verifieSiDoublon.test(value)) {
							var verifieSiDoublonL = new RegExp("DOUBLON:[0-9]{13}:L");
							if (verifieSiDoublonL.test(value)) {
								msg='Pour accéder à votre espace particulier, vous devez saisir votre nouvel identifiant fiscal qui se trouve sur vos derniers documents fiscaux et qui vous a été envoyé par courriel.';
								messageACaractereInformatif(msg);
							}
							else {
								actif=value.split(':')[1];
								msg='Pour des raisons techniques votre numéro fiscal est désormais le suivant : '+ actif + ' . Veuillez l\'utiliser pour créer votre espace particulier.';
								messageACaractereInformatif(msg);
								$('#spi_tmp').val(actif);
							}
						}
					}
				}
				break;
			//------------------------------------------------------------------------------------------------------------------
			//Acces via LMDP
			//------------------------------------------------------------------------------------------------------------------
			case 'lmdp':
				traiteLMDP(value);
				break;
			//------------------------------------------------------------------------------------------------------------------
			//Acces creation via date si PAS/MP
			//------------------------------------------------------------------------------------------------------------------
			case 'pas':
				traitePAS(value);
				break;
			//------------------------------------------------------------------------------------------------------------------
			//Acces creation via 3S
			//------------------------------------------------------------------------------------------------------------------
			case '3S':
				traite3S(value);
				break;
			//------------------------------------------------------------------------------------------------------------------
			//Les oublis/récupérations
			//------------------------------------------------------------------------------------------------------------------
			case 'passPerdu':
			case 'numFiscal':
				traiteOubli(message,value);
				break;
			//------------------------------------------------------------------------------------------------------------------
			//Retour OK d'une auth.
			//------------------------------------------------------------------------------------------------------------------
			case 'ok':
				//$('#erreur').html('Authentification réussie.').removeClass('hide alert-danger text-center').addClass('alert alert-info');
				$('#erreur').html('').removeClass('alert-danger text-center').addClass('alert alert-danger hide');
				$('#blocage').html('').removeClass('alert-info').addClass('alert alert-danger hide ');
				document.location.href=value;
				break;
			//------------------------------------------------------------------------------------------------------------------
			//Indispo générée par MP
			//------------------------------------------------------------------------------------------------------------------
			case 'indispoMP':
				$("#passPerdu").modal('hide');
				$("#numFiscal").modal('hide');
				$("#indispoMP").modal('show');
				break;
			//Fin traitement des messages retours des soumissions
			default : 
			}
		},false);
	}
//--------------------------------------------------------------------------------------------------------------------------------------
//Controle des champs de saisie a chaque modification - s'appuie sur  balises libres data-* coté html pour le parametrage des traitements
//--------------------------------------------------------------------------------------------------------------------------------------
function controleEntreeLive(){
	var oldInput="";
	$("input").on('change input',function(e){
		var masks = {
			//liste des masques : le complement de ce que l'on accepte
			'int': /[^0-9]/g,
			'alpha': /[^a-z]/g,
			'alphanum': /[^a-zA-Z0-9]/g,
			'mail': /[^-_\.@a-zA-Z0-9]/g,
			'date': /[^0-9\/]/g
		};
		var mask=$(this).attr('data-mask');
		var feedbackOK=$(this).attr('data-feedbackok');
		//Si data-mask existe, on verifie la saisie pour cet input
		if (mask) {
			var regex = (masks[mask]) ? masks[mask] : mask;
			var max=$(this).attr('data-max');
			var lgMax =(max) ? max : -1 ;
			var sale= $(this).val();
			var propre=sale.replace(regex,"");
			if (oldInput.length == lgMax && propre.length > lgMax ) {
				propre=oldInput;
			}
			else {
				propre=propre.substring(0,lgMax);
			}
			if(mask=='date') {
				//1=<J=<9
				newpropre=propre.replace(/^([1-9])\//,"0$1/");
				//1=<M=<9
				finalpropre=newpropre.replace(/^(..)\/([1-9])\//,"$1/0$2/");
				if(propre!=finalpropre) {
					propre=finalpropre;
					sale=propre;
				}
			}
			$(this).val(propre);
			//var propre=sale.replace(regex,"").substring(0,lgMax);
			if(propre.length==lgMax) {
				if (feedbackOK) {
					$(this).css({ color: 'green' });
					if($('#formulairePrincipal').attr('name')=='CTX') {
						$('#btnAction').removeAttr("aria-label").addClass('btn-primary btn-glow').removeClass('btn-default').removeClass('disabled').parent().attr({ 'data-original-title': '', 'data-toggle': 'tooltip', 'data-placement': 'bottom' })
					}
				}
			}
			if (sale.length > lgMax ){
				var prefix="liveCheck_";
				idDivMessage= prefix + $(this).attr('id');
				$('#'+idDivMessage).html('Longueur maximale').removeClass('hidden');
				setTimeout(function() {
					$('#'+idDivMessage).html('Longueur maximale').addClass('hidden');
				}, 1500);
			} else if (propre!=sale) {
					var prefix="liveCheck_";
					idDivMessage= prefix + $(this).attr('id');
					$('#'+idDivMessage).html('Caract&egrave;re non autoris&eacute').removeClass('hidden');
					setTimeout(function() {
						$('#'+idDivMessage).html('Caract&egrave;re non autoris&eacute;').addClass('hidden');
					}, 1500);
				}
			if(propre.length<lgMax) {
				if (feedbackOK) {
					$(this).css({ color: '#555' });
					if($('#formulairePrincipal').attr('name')=='CTX') {
						$('#btnAction').attr('aria-label','Pour continuer, veuillez saisir votre numéro fiscal.').addClass('btn-default').removeClass('btn-primary btn-glow').addClass('disabled').parent().attr({ 'data-original-title': 'Pour continuer, veuillez saisir votre numéro fiscal.', 'data-toggle': 'tooltip', 'data-placement': 'bottom' })
					}
				}
			}
			oldInput=propre;
		}
	});
}
//---------------------------------------------------------------------------------------------------------------------------
//Gestion des rubriques d'aide
//---------------------------------------------------------------------------------------------------------------------------
function accordeon(){
	$('details').click(function (event) {
		$('details').not(this).removeAttr("open").attr('aria-hidden', true);
	});
}
//---------------------------------------------------------------------------------------------------------------------------
//Gestion de la deconnexion
//---------------------------------------------------------------------------------------------------------------------------
function disconnect(courant,nbApp,cible){
	if( courant == 0 ){
		iframes[courant] = document.getElementById("app0");
		iframes[courant].called = 0;
		if (navigator.userAgent.indexOf("MSIE") > -1 && !window.opera){
			// ------------------------------------------------ IE
			iframes[courant].onreadystatechange = function(oframe){
				if(!oframe && iframes[courant].called == 0){
					iframes[courant].called = 1;
					oframe = iframes[courant];
				}else{
					if(!oframe){
						return;
					}
				}
				if (iframes[courant].readyState == "complete"){
					courant++;
					setTimeout(disconnect(courant,nbApp,cible),deco_delay);
				}else{
					setTimeout("iframes["+courant+"].onreadystatechange(iframes["+courant+"])",deco_delay);
				}
			};
		}else{
			// ----------------------------------------------non IE
			iframes[courant].onload = function(){
				courant++;
				setTimeout(disconnect(courant,nbApp,cible),deco_delay);
			};
		}
		document.getElementById("app0").src = "/root/deconnexionGlobaleDAC";
	}else{
		if( courant <= nbApp ){
			iframes[courant] = document.getElementById("app"+courant);
			iframes[courant].called = 0;
			if (navigator.userAgent.indexOf("MSIE") > -1 && !window.opera){
				iframes[courant].onreadystatechange = function(oframe){
					if(!oframe && iframes[courant].called == 0){
						iframes[courant].called = 1;
						oframe = iframes[courant];
					}else{
						if(!oframe){
							return;
						}
					}
					if (iframes[courant].readyState == "complete"){
						courant++;
						setTimeout(disconnect(courant,nbApp,cible),deco_delay);
					}else{
							setTimeout("iframes["+courant+"].onreadystatechange(iframes["+courant+"])",deco_delay);
						}
				};
			}else{
				iframes[courant].onload = function(){ courant++; setTimeout(disconnect(courant,nbApp,cible),deco_delay); };
			}
		document.getElementById("app" + courant).src = "/"+files[courant-1]+"/deconnexionGlobaleDAC";
		}else{
			window.location.href = cible;
		}
	}
}
//--------------------------------------------------------------------------------
//Traitement des soumissions des lostIds
//--------------------------------------------------------------------------------
function traiteOubli(oubli,retour){
	NoError();
	message="";
	focusTo="";
	nomFormOubli="";
	if (oubli=='passPerdu') {
		reverseEtGardeChamps('oubliMotDePasseForm','_tmp','numfiscal');	
		nomFormOubli="oubliMotDePasseForm";
	}
	else {
		if (oubli=='numFiscal'){
		reverseEtGardeChamps('oubliNumFiscalForm','_tmp','email');	
		nomFormOubli="oubliNumFiscalForm";
		}
	}
	ok=0;
	switch(retour) {
		case "OK":
			if (oubli=='passPerdu') {
				$("#passPerdu").modal('hide');
				$("#confirmationPassword").modal('show');
			}
			else {
				if (oubli=='numFiscal'){
					$("#numFiscal").modal('hide');
					$("#confirmationSpi").modal('show');
				}
			}
			ok=1;
			break;
		case 'CAT1':
			message=message+"La saisie des caract&egrave;res de l'image ou de l'extrait sonore est incorrecte. Veuillez recommencer.";
			erreurEtVideChamps(oubli == "numFiscal" ? "captchaTextPwd" : "captchaTextFisc") ;  
			if(focusTo.length==0)focusTo="captchaTextFisc";
			break;
		case("CAT3"):
			message=message+"La saisie de l'ensemble des champs est obligatoire.";
			break;
		case "CAT2":
			message=message+"Cette proc&eacute;dure est r&eacute;serv&eacute;e aux personnes ayant d&eacute;j&agrave; cr&eacute;&eacute; un espace particulier."
			break;
		case "CAT4":
			message=message+"Vous ne pouvez pas acc&eacute;der &agrave; votre espace particulier et utiliser les services en ligne.&nbsp;"
			+ "Veuillez nous en excuser.&nbsp;"
			+ "Nous vous invitons &agrave; contacter votre <a target=\"_blank\" class=\"modal-link\" href=\"https://www.impots.gouv.fr/portail/contacts\">centre des finances publiques</a>";
			break;
		case "CAT5":
			message=message+"Le format de votre adresse &eacute;lectronique est incorrect. Veuillez le v&eacute;rifier (par exemple : abcd24@fai.fr)."
			erreurEtGardeChamps("email");
			if(focusTo.length==0)focusTo="email";
			
			break;
		case "CAT6":
			message="Votre num&eacute;ro fiscal ne permet pas d'acc&eacute;der &agrave; cette fonctionnalit&eacute;. Nous vous prions de bien vouloir nous en excuser. Veuillez contacter votre <a target=\"_blank\" class=\"modal-link\" href=\"https://www.impots.gouv.fr/portail/contacts\">centre des finances publiques</a>.";
			break;
		case "CAT7":
			message='Le numéro fiscal renseigné n\'est pas connu de nos services.&nbsp; Veuillez vérifier votre saisie.<br>';
			erreurEtGardeChamps("numfiscal");
			focusTo="numfiscal";
			break;
		case "CAT8":
			message="L'application est momentan&eacutement indisponible. Veuillez r&eacuteessayer ult&eacuterieurement.";
			break;
		case "CAT9":
			message="Le num&eacute;ro fiscal saisi est incorrect&nbsp;; veuillez recommencer.";
			erreurEtGardeChamps("numfiscal");
			focusTo="numfiscal";
			break;
		case "CAT10":
			message="Vous ne pouvez pas acc&eacute;der &agrave; votre espace particulier et utiliser les services en ligne.&nbsp;"
			+ "Veuillez nous en excuser.&nbsp;"
			+ "Nous vous invitons &agrave; contacter votre <a target=\"_blank\" class=\"modal-link\" href=\"https://www.impots.gouv.fr/portail/contacts\">centre des finances publiques</a>";
			break;
		case "CAT11":
			message="Cette proc&eacute;dure est r&eacute;serv&eacute;e aux personnes ayant d&eacute;j&agrave; cr&eacute;&eacute; un espace particulier.";
			break;
		default:
			message="L'application est momentan&eacutement indisponible. Veuillez r&eacuteessayer ult&eacuterieurement.";
			if ((oubli=='passPerdu') && (retour.substring(0,3)=='OK:')){
				$("#passPerdu").modal('hide');
				$("#confirmationPassword").modal('show');
				$("#confirmationPassword").find('.lienMP').remove();
				$("#confirmationPassword").find('.modal-body').append("<p class='lienMP'>"+retour.substring(3)+"</p>");
				ok=1;
			}
			break;
	}
	if (ok==0) {
		$(".captcha").attr('src', '/monprofil-webapp/noAuth/Lostidents?format=image' + '&?id' + (new Date()).getTime());
	}
	if(focusTo.length!=0)donneFocus(nomFormOubli,focusTo) ;
	if(oubli=='passPerdu'){
		$("#erreurModPwd").html(message).removeClass('alert-info hide text-center').addClass('alert-danger');
	}
	else {
		if (oubli=='numFiscal'){
			$("#erreurModFisc").html(message).removeClass('alert-info hide text-center').addClass('alert-danger');
		}
	}
}
//--------------------------------------------------------------------------------
//Traitement des retours soumissions auth. 3S
//--------------------------------------------------------------------------------
function traite3S(retour)
	{
		NoError();
		reverseEtGardeChamps(message,'_tmp','spi','teledec','rfr');
		switch(retour) {
			//---------------------------------------------------------------------
			case '5001':
			case '5009':
				$('#erreur').html('Les données saisies sont incorrectes.<br>Vérifier la saisie de vos identifiants.').removeClass('hide alert-info').addClass('alert alert-danger');
				erreurEtVideChamps('teledec');
				erreurEtVideChamps('rfr');
				break;
			//---------------------------------------------------------------------
			case '4' :
			case '6' :
			case '7' :
			case '8' :
			case '9' :
				$('#erreur').html('L\'application est indisponible ; veuillez réessayer ultérieurement.').removeClass('hide alert-info').addClass('alert alert-danger');
				break;
			//---------------------------------------------------------------------
			case '2' :
				$('#erreur').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide').addClass('alert alert-danger');
				break;
			//---------------------------------------------------------------------
			case '5021':
			case '5022':
			case '5023':
			case '8999':
				$('#erreur').html('L\'application est indisponible ; veuillez réessayer ultérieurement.').removeClass('hide alert-info').addClass('alert alert-danger');
				afficheForm('CTX');
				break;
			//---------------------------------------------------------------------
			case '5024':
				$('#erreur').html('Format des données incorrect.<br>Vérifier la saisie de vos identifiants.').removeClass('hide alert-info').addClass('alert alert-danger');
				break;
		}
	}
//--------------------------------------------------------------------------------
//Traitement des retours soumissions PAS
//--------------------------------------------------------------------------------
function traitePAS(retour)
	{
		reverseEtGardeChamps('PAS','_tmp','spi','dateNaissance');
		videChamps('PAS','_tmp','dateNaissance');
		//retour=value.split(':');
		code=retour.split(':')[0];
		message=retour.split(':')[1];
		NoError();
		switch(code) {
			case '0':
				$('#blocage').html('').removeClass('alert alert-danger').addClass('alert alert-info hide ');
				$('#erreur').html('').removeClass('alert alert-danger').addClass('alert alert-info hide ');
				afficheForm('PAS');
				break;
			case '7001':
				$('#blocage').html('').removeClass('alert alert-danger').addClass('alert alert-info hide ');
				$('#erreur').html('Les données saisies sont incorrectes.<br>Vérifier la saisie de vos identifiants.').removeClass('hide alert-info').addClass('alert alert-danger');
				break;
			case '7005':
				$('#blocage').html('').removeClass('alert alert-danger').addClass('alert alert-info hide ');
				$('#erreur').html('Les données saisies sont incorrectes.<br>Veuillez vérifier la saisie de votre date de naissance.').removeClass('hide alert-info text-center').addClass('alert alert-danger');
				$('#blocage').html('Il vous reste ' + message +  (message > 1 ? ' essais' : ' essai')  + ' pour vous identifier.').removeClass('hide alert-info').addClass('alert alert-danger');
				break;
			case '7002':
				$('#blocage').html('').removeClass('alert alert-danger').addClass('alert alert-info hide ');
				$('#erreur').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide').addClass('alert alert-danger');
				break;
			case '7009':
				$('#erreur').html('Les données saisies sont incorrectes.<br>Vérifier la saisie de vos identifiants.').removeClass('hide alert-info').addClass('alert alert-danger');
				$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
				break;
			case '7024':
				$('#erreur').html('Format des données incorrect.<br>Vérifier la saisie de vos identifiants.').removeClass('hide alert-info').addClass('alert alert-danger');
				$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
				break;
			case '7020':
				$('#erreur').html('À la suite de plusieurs saisies erronées, votre accès est suspendu pendant '+ message ).removeClass('hide alert-info').addClass('alert alert-danger');
				$('#blocage').html('').removeClass('alert-info').addClass('alert alert-danger hide');
				break;
			default :
					$('#erreur').html('L\'application est indisponible ; veuillez réessayer ultérieurement.').removeClass('hide alert-info').addClass('alert alert-danger');
					afficheForm('CTX');	          
					break;
		}
	}
function traiteLMDP(retour)
	{
		reverseEtGardeChamps('LMDP','_tmp','spi','pwd');
		videChamps('LMDP','_tmp','pwd');
		code=retour.split(':')[0];
		message=retour.split(':')[1];
		ctxDoublon=retour.split(':')[2];
		switch(code) {
			case '0':
				$('#erreur').html('').removeClass('alert-danger text-center').addClass('alert alert-danger hide');
				$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
				break;
			case '4002':
				$('#blocage').html('').removeClass('alert alert-danger').addClass('alert alert-info hide ');
				$('#erreur').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide').addClass('alert alert-danger');
				break;
			case '4004':
				NoError();
				msg='Le numéro fiscal renseigné n\'est pas connu de nos services.&nbsp; Veuillez vérifier votre saisie.<br>';
				msg+='Si votre identifiant fiscal ne comporte pas d\'erreur, nous vous invitons à contacter votre  <a id="CFP" href="https://www.impots.gouv.fr/portail/contacts">centre des Finances Publiques.</a>';
				//messageACaractereInformatif(msg);
				$('#erreur').html(msg).removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
				$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
				erreurEtGardeChamps('spi');
				donneFocus('LMDP','spi');
				break;
			case '4005':
				$('#erreur').html(messageContenu[code]).removeClass('hide alert-info text-center').addClass('alert alert-danger');
				$('#blocage').html('Il vous reste ' + message +  (message > 1 ? ' essais' : ' essai')  + ' pour vous identifier par mot de passe.').removeClass('hide alert-info').addClass('alert alert-danger');
				erreurEtVideChamps('pwd');
				break;
			case '4006' :
			case '4007' :
			case '4008' :
			case '4009' :
				$('#erreur').html('L\'application est indisponible ; veuillez réessayer ultérieurement.').removeClass('hide alert-info').addClass('alert alert-danger');
				break;
			case '4020':
				$('#erreur').html('Votre accès est suspendu pendant '+ message ).removeClass('hide alert-info').addClass('alert alert-danger');
				$('#blocage').html('Attention, vous devez veiller à respecter les minuscules et les majuscules lors de la saisie de votre identifiant et de votre mot de passe. Si vous avez perdu votre mot de passe, vous pouvez le renouveler en quelques clics.').removeClass('hide alert-info').addClass('alert alert-danger');
				break;
			case '5500' :
			case '6500' :
				if (ctxDoublon.length) {
					if (ctxDoublon=="L") {
						$('#erreur').html(messageContenu[code].replace(/(nouvel identifiant fiscal) .*\./,'$1 '+message+'.')).removeClass('hide alert-info text-center').addClass('alert alert-danger');
						$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
					}
					//else if ( ctxDoublon=="A" || ctxDoublon=="P" || ctxDoublon=="M" || ctxDoublon=="N" ) {
					else  {
						$('#erreur').html(messageContenu[5600]).removeClass('hide alert-info text-center').addClass('alert alert-danger');
						$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
					}
				}
				break;
			case '5501' :
			case '5502' :
				$('#erreur').html(messageContenu[code]).removeClass('hide alert-info text-center').addClass('alert alert-danger');
				$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
				erreurEtGardeChamps('spi');
				donneFocus('LMDP','spi');
				break;
			case '5601' :
			case '5602' :
			case '5603' :
			case '5604' :
				$('#erreur').html(messageContenu[code]).removeClass('hide alert-info text-center').addClass('alert alert-danger');
				$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
				break;
			default:
				$('#erreur').html(messageContenu[code]).removeClass('hide alert-info text-center').addClass('alert alert-danger');
				$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
			}
	}
//--------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------
// Initialisation des messages et adaptation
//------------------------------------------------------------------------------------------------------------------------------------------------------------
function initMessages(typeAuth) {
	messageContenu[4005]='Votre mot de passe est incorrect, r&eacute;essayez ou cliquez sur &laquo;Vous avez oubli&eacute; votre mot de passe &raquo;';
	messageContenu[4004]='Le numéro fiscal renseigné n\'est pas connu de nos services.&nbsp; Veuillez vérifier votre saisie.<br>';
	messageContenu[4004]+='Si votre identifiant fiscal ne comporte pas d\'erreur, nous vous invitons à contacter votre  '+cfp['INCONNU'];
	messageContenu['badFormatPwd']='Le format de votre mot de passe est incorrect. Il doit comporter 8 &agrave; 128 caract&egrave;res dont une lettre et un chiffre.<br>Il peut aussi contenir les caract&egrave;res sp&eacute;ciaux suivants&nbsp;:&nbsp;! # $ % & * + - / = ? ^ _ \' . { | }.';
	messageContenu['badFormatSpi']='Votre numéro fiscal comporte 13 chiffres&nbsp;;&nbsp;veuillez vérifier votre saisie.';
	messageContenu['badFormatDate']='Le format de la date saisie est incorrect (exemple de format attendu 01/03/1980).';
	messageContenu['titreFenetreCTX']='Particuliers | authentification';
	messageContenu['titreFenetreLMDP']='Particuliers | authentification';
	messageContenu['titreFenetreCreation']='Particuliers | création de votre espace particulier';
	messageContenu['titreFenetre3S']=messageContenu['titreFenetreCreation'];
	messageContenu['titreFenetrePAS']=messageContenu['titreFenetreCreation'];
	messageContenu['ctx_EXISTEPAS']=messageContenu[4004];
	messageContenu['ctx_NOINFO']='Pour créer votre espace particulier, vous devez préalablement fournir à votre '+cfp['NOINFO']+' des éléments permettant de prouver votre identité.'
	switch(typeAuth) {
		//----------------------------------------------------------------------------------------------------------
		//Les messages pour les DAC SSO et la voie PayFip
		//----------------------------------------------------------------------------------------------------------
		case 'payfip' :
			messageContenu[4005]='Les données saisies sont incorrectes. Vérifiez la saisie de vos identifiants.';
			messageContenu[5500]='Pour acc&eacute;der au service, vous devez saisir votre nouvel identifiant fiscal qui vous a &eacute;t&eacute; envoy&eacute; par courriel&nbsp;.';
			messageContenu[6500]=messageContenu[5500];
			messageContenu[5501]='Vous ne pouvez pas acc&eacute;der au service&nbsp;;&nbsp;veuillez nous en excuser.&nbsp;Nous vous invitons &agrave; contacter votre '+cfp[5501];
			messageContenu[5502]='Le num&eacute;ro fiscal renseign&eacute; n\'est pas connu de nos services.&nbsp;Veuillez v&eacute;rifier votre saisie.&nbsp;Si votre identifiant fiscal ne comporte pas d\'erreur, nous vous invitons &agrave; contacter votre '+cfp['INCONNU'];
			messageContenu['badFormatSpi']='Le format de votre numéro fiscal est incorrect. Seuls sont autorisés 13 caractères numériques.'
			messageContenu[5600]='Vous n\'avez pas encore cr&eacute;&eacute; un acc&egrave;s &agrave; votre espace particulier.&nbsp;Veuillez cliquer sur le bouton &laquo;Cr&eacute;er mon espace particulier&raquo;.';
			messageContenu[5601]=messageContenu[5600];
			messageContenu[5602]=messageContenu[5600];
			messageContenu[5603]=messageContenu[5600];
			messageContenu[5700]='Vous avez d&eacute;j&agrave; initi&eacute; la proc&eacute;dure de cr&eacute;ation de votre espace particulier. Vous devez cliquer sur le lien qui vous a &eacute;t&eacute; adress&eacute; par courriel.';
			messageContenu['titreFenetreLMDP']='Authentification PayFip';
			break;
		//----------------------------------------------------------------------------------------------------------
		//Les messages pour les DAC SSO et la voie normale
		//----------------------------------------------------------------------------------------------------------
		default :
			break;
	

}	
}	
