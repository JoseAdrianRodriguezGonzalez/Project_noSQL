#!/bin/bash
# insert_students.sh

echo "🔹 Iniciando inserción de estudiantes..."

# Contadores
success_count=0
fail_count=0
total=$(jq '. | length' students.json)

echo "📊 Total de estudiantes a insertar: $total"

# Iterar sobre cada estudiante
jq -c '.[]' students.json | while read -r student; do
    name=$(echo "$student" | jq -r '.name')
    birthDate=$(echo "$student" | jq -r '.birthDate')
    email=$(echo "$student" | jq -r '.email')
    
    echo "➡️ Insertando: $name"
    
    response=$(curl -X POST \
        -H "Content-Type: application/json" \
        -d "$student" \
        http://localhost:3000/insert)
    
    if [ "$response" -eq 201 ]; then
        echo "✅ Éxito: $name"
        ((success_count++))
    else
        echo "❌ Error ($response): $name"
        ((fail_count++))
    fi
done

echo ""
echo "📊 RESUMEN FINAL:"
echo "✅ Insertados exitosamente: $success_count"
echo "❌ Fallidos: $fail_count"
echo "📝 Total procesados: $((success_count + fail_count))"
