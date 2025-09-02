document.addEventListener('DOMContentLoaded', () => {
    const materialsList = document.getElementById('materials-list');
    const materials = JSON.parse(localStorage.getItem('materials')) || [];

    if (materials.length > 0) {
        materials.forEach(material => {
            const materialDiv = document.createElement('div');
            materialDiv.classList.add('material-item');
            materialDiv.innerHTML = `
                <h3>${material.title}</h3>
                <p>${material.content.replace(/\n/g, '<br>')}</p>
                <hr>
            `;
            materialsList.appendChild(materialDiv);
        });
    } else {
        materialsList.innerHTML = '<p>Nenhum material de aula disponível no momento.</p>';
    }
});
