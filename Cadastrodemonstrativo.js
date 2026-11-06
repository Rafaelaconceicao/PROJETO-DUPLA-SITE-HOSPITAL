const form = document.getElementById('agendamentoForm');
const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validacoes = {
	nome: (valor) => valor.trim().length >= 3,
	email: (valor) => emailValido.test(valor.trim()),
	telefone: (valor) => valor.replace(/\D/g, '').length >= 10,
	especialidade: (valor) => valor !== ''
};

function validarCampo(campo) {
	const grupo = campo.closest('.form-group');
	const valido = validacoes[campo.id](campo.value);

	grupo.classList.toggle('invalid', !valido);
	campo.setAttribute('aria-invalid', String(!valido));

	return valido;
}

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const campos = Array.from(form.querySelectorAll('input, select'));
	const formularioValido = campos.map(validarCampo).every(Boolean);

	if (!formularioValido) {
		return;
	}

	document.getElementById('sucessoNome').textContent = document.getElementById('nome').value.trim();
	document.getElementById('sucessoEspecialidade').textContent = document.getElementById('especialidade').value;
	document.getElementById('sucessoEmail').textContent = document.getElementById('email').value.trim();

	document.getElementById('mensagemSucesso').style.display = 'block';
	form.style.display = 'none';
});

form.addEventListener('input', (event) => {
	if (event.target.matches('input, select') && event.target.closest('.form-group').classList.contains('invalid')) {
		validarCampo(event.target);
	}
});

form.addEventListener('change', (event) => {
	if (event.target.matches('input, select') && event.target.closest('.form-group').classList.contains('invalid')) {
		validarCampo(event.target);
	}
});
