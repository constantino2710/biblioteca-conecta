import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function gerarSenha(): number[] {
  const digitos: number[] = [];
  while (digitos.length < 4) {
    const n = Math.floor(Math.random() * 10);
    if (!digitos.includes(n)) {
      digitos.push(n);
    }
  }
  return digitos;
}

function verificarTentativa(senha: number[], tentativa: string) {
  const tentativaArr = tentativa.split("").map(Number);
  let acertos = 0;
  let deslocados = 0;

  tentativaArr.forEach((num, idx) => {
    if (num === senha[idx]) {
      acertos++;
    } else if (senha.includes(num)) {
      deslocados++;
    }
  });

  return { acertos, deslocados };
}

export function Password() {
  const [senha, setSenha] = useState<number[]>([]);
  const [entrada, setEntrada] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [vitoria, setVitoria] = useState(false);
  const [tentativas, setTentativas] = useState<string[]>([]);
  const [jogoIniciado, setJogoIniciado] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const iniciarJogo = () => {
    setSenha(gerarSenha());
    setEntrada("");
    setMensagem("");
    setVitoria(false);
    setTentativas([]);
    setJogoIniciado(true);
  };

  useEffect(() => {
    if (jogoIniciado && inputRef.current) {
      inputRef.current.focus();
    }
  }, [jogoIniciado]);

  const handleSubmit = () => {
    if (!/^\d{4}$/.test(entrada)) {
      setMensagem("Entrada inválida. Use exatamente 4 dígitos numéricos.");
      return;
    }

    const tentativa = entrada.split("").map(Number);
    const setTentativa = new Set(tentativa);
    if (setTentativa.size !== 4) {
      setMensagem("Os dígitos devem ser únicos.");
      return;
    }

    const { acertos, deslocados } = verificarTentativa(senha, entrada);

    const resultado = `${entrada} → ${acertos} na posição correta, ${deslocados} correto(s) fora de posição.`;
    setTentativas((prev) => [resultado, ...prev]);

    if (acertos === 4) {
      setVitoria(true);
      setMensagem("Parabéns! Você acertou a senha!");
    } else {
      setMensagem(resultado);
    }
  };

  const revelarSenha = () => {
    Alert.alert("Senha", senha.join(""));
  };

return (
  <SafeAreaView className="flex-1 items-center justify-center bg-[#0D1117] p-4 w-full">
    <View className="bg-[#262c35] shadow-lg rounded-2xl p-6 w-full max-w-md">
      <Text className="text-2xl font-bold mb-4 text-center text-white">
        Jogo da Senha
      </Text>
      {!jogoIniciado ? (
        <View className="flex items-center">
          <TouchableOpacity
            onPress={iniciarJogo}
            className="bg-green-500 h-8 w-32 px-4 rounded justify-center items-center"
          >
            <Text className="text-white">Iniciar Jogo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View className="gap-2 flex flex-col items-center">
            <TextInput
              ref={inputRef}
              keyboardType="number-pad"
              value={entrada}
              onChangeText={setEntrada}
              className="w-full rounded mb-4 bg-gray-600 text-white h-12 px-2"
              placeholder="Digite 4 dígitos únicos"
              maxLength={4}
              editable={!vitoria}
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity
              onPress={handleSubmit}
              className="w-full bg-green-500 py-2 rounded h-12 justify-center items-center"
              disabled={vitoria}
            >
              <Text className="text-white">Verificar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={revelarSenha}
              className="w-full bg-red-500 py-2 rounded mt-2 h-12 justify-center items-center"
            >
              <Text className="text-white">Revelar Senha</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={iniciarJogo}
              className="w-full bg-yellow-500 py-2 rounded mt-2 h-12 justify-center items-center"
            >
              <Text className="text-white">Recomeçar Jogo</Text>
            </TouchableOpacity>
          </View>
          {mensagem ? (
            <Text className="mt-4 text-center text-lg font-medium text-white">
              {mensagem}
            </Text>
          ) : null}
          {tentativas.length > 0 ? (
            <ScrollView className="mt-4 h-40 w-full bg-gray-600 rounded p-2">
              {tentativas.map((t, i) => (
                <Text key={i} className="text-white text-sm">
                  {t}
                </Text>
              ))}
            </ScrollView>
          ) : null}
        </>
      )}
    </View>
  </SafeAreaView>
);
}