// generateStudents.js
import fs from "fs"
function generateStudents() {
    const students = [];
    const firstNames = [
        'Juan', 'Maria', 'Carlos', 'Ana', 'Luis', 'Laura', 'Miguel', 'Elena', 
        'Jose', 'Carmen', 'Francisco', 'Isabel', 'Antonio', 'Rosa', 'Manuel', 
        'Patricia', 'David', 'Marta', 'Javier', 'Sofia', 'Daniel', 'Lucia', 
        'Alejandro', 'Paula', 'Pedro', 'Cristina', 'Raul', 'Eva', 'Alberto', 
        'Teresa', 'Roberto', 'Silvia', 'Fernando', 'Nuria', 'Diego', 'Claudia', 
        'Sergio', 'Olga', 'Pablo', 'Raquel', 'Victor', 'Monica', 'Ruben', 
        'Angela', 'Adrian', 'Beatriz', 'Jorge', 'Consuelo', 'Alfonso', 'Ines'
    ];
    
    const lastNames = [
        'Garcia', 'Rodriguez', 'Gonzalez', 'Fernandez', 'Lopez', 'Martinez', 
        'Sanchez', 'Perez', 'Gomez', 'Martin', 'Jimenez', 'Ruiz', 'Hernandez', 
        'Diaz', 'Moreno', 'Alvarez', 'Romero', 'Alonso', 'Gutierrez', 'Navarro', 
        'Torres', 'Dominguez', 'Vazquez', 'Ramos', 'Gil', 'Ramirez', 'Serrano', 
        'Blanco', 'Molina', 'Morales', 'Ortega', 'Delgado', 'Castro', 'Ortiz', 
        'Rubio', 'Marin', 'Sanz', 'Iglesias', 'Medina', 'Garrido', 'Cortes', 
        'Castillo', 'Santos', 'Lozano', 'Guerrero', 'Cano', 'Prieto', 'Mendez', 
        'Cruz', 'Calvo', 'Vidal', 'Leon', 'Herrera', 'Marquez', 'Peña', 'Cabrera'
    ];
    
    const domains = ['ugto.mx'];
    
    // Generar combinaciones únicas de nombres
    const usedEmails = new Set();
    
    for (let i = 0; i < 1000; i++) {
        let firstName, lastName, email;
        let attempts = 0;
        do {
            firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const emailFormats = [
                `${firstName.toLowerCase().charAt(0)}.${lastName.toLowerCase()}`,
                `${firstName.toLowerCase()}.${lastName.toLowerCase().charAt(0)}`,
                `${firstName.toLowerCase()}${lastName.toLowerCase().charAt(0)}`,
                `${lastName.toLowerCase()}.${firstName.toLowerCase().charAt(0)}`,
                `${firstName.toLowerCase().substring(0, 3)}.${lastName.toLowerCase().substring(0, 3)}`,
                `${lastName.toLowerCase().substring(0, 4)}.${firstName.toLowerCase().substring(0, 2)}`
            ];
            
            const emailFormat = emailFormats[Math.floor(Math.random() * emailFormats.length)];
            email = `${emailFormat}@${domains[0]}`;
            
            // Si hay duplicado, agregar número
            if (usedEmails.has(email) && attempts < 5) {
                email = `${emailFormat}${Math.floor(Math.random() * 99) + 1}@${domains[0]}`;
            }
            
            attempts++;
        } while (usedEmails.has(email) && attempts < 10);
        
        usedEmails.add(email);
        
        // Generar fecha de nacimiento (entre 1995-2005)
        const start = new Date(1995, 0, 1);
        const end = new Date(2005, 11, 31);
        const birthDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        
        const student = {
            name: `${firstName} ${lastName}`,
            birthDate: birthDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
            email: email
        };
        
        students.push(student);
    }
    
    return students;
}

// Generar y guardar el archivo

const students = generateStudents();

fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
console.log('Archivo students.json generado con 1000 estudiantes');