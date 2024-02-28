export default function inputTel() {

	jQuery(function() {

		const {Mask, MaskInput, vMaska} = Maska;

		let phoneControl = {
		
			detectedMobileErrors: function (el) {
				if (!phoneControl.detectedMobileCode(el.val())) {
					el.parent().addClass('has-error');
					el.parent().find('.invalid-feedback').remove();
					el.parent().append('<strong class="invalid-feedback">Вкажіть правильний код мобільного оператора!</strong>');
				} else {
					el.parent().removeClass('has-error');
					el.parent().find('.invalid-feedback').remove();
				}
			},
		
			detectedMobileCode: function (val) {
				val = val.replace(/\s/g, '');
		
				let code = val.substr(4, 3),
					check;
		
				code = code.replace('_', '');
		
		
				let operators = ['031', '032', '033', '034', '035', '036', '037', '041',
					'043', '044', '045', '046', '047', '048', '049', '050', '051', '052', '053',
					'054', '055', '056', '057', '061', '062', '063', '064', '066', '067', '068',
					'073', '091', '092', '093', '094', '095', '096', '097', '098', '099',
				];
		
				if (code.length === 3) {
					if ($.inArray(code, operators) !== -1) check = true;
					else check = false;
				} else {
					check = true;
				}
				return check;
			},
		
			tel: function () {
				if ($('input[type="tel"]').length) {
					new MaskInput('input[type="tel"]', {
						mask: "+38(0A#) ###-##-##",
						tokens: {
							A: {pattern: /[1-9]/,}
						}
					});
				}
		
				$('input[type="tel"]').on('keyup', function (e) {
					phoneControl.detectedMobileErrors($(this))
				});
			},
			init: function () {
				this.tel();
			}
		};
		
		phoneControl.init();

	})
}