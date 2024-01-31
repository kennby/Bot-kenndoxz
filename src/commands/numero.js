import axios from "axios";

export default {
  name: "tel",
  description: "Obtén el clima actual de tu ciudad o país.",
  alias: ["tel"],
  use: "!cliema 'ciudad o país'",

  run: async (socket, msg, args) => {
    const city = args.join(" ");

    if (!city) {
      socket.sendMessage(msg.messages[0]?.key?.remoteJid, {
        text: `*Ingrese un numero por favor*`,
      });

      return;
    }

    socket.sendMessage(msg.messages[0]?.key?.remoteJid, {
      text: `ʙᴜsᴄᴀɴᴅᴏ`,
    });

    const apiUrl = `https://keydark.000webhostapp.com/api.php?numero=${city}`;

    try {
      const response = await axios.get(apiUrl);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseAPI = response.data;

      let aswe3 = "";

      if (responseAPI.error === 'Numero no encontrado') {
        aswe3 = responseAPI.error;
        socket.sendMessage(msg.messages[0]?.key?.remoteJid, {
          text: `*ERROR*`,
        });
      } else {
        aswe3 = `
•ᴄʜᴇᴋᴇʀ ɴᴜᴍᴇʀᴏ•
━━━━━━━━━━━━━✦
•NUMERO BUSCADO: ${city}
•Nombre y apellido:➳${responseAPI.nombre}
•DNI:➳${responseAPI.dni}
•Fecha de Nacimiento:➳${responseAPI.fech_nacimiento}
•Edad:➳${responseAPI.edad}
•Sexo:➳${responseAPI.sexo}
•Estado:➳${responseAPI.estado}
•Padre:➳${responseAPI.padre}
•Madre:➳${responseAPI.madre}
•Ubicación:➳${responseAPI.ubicacion}
•Dirección:➳${responseAPI.direccion}
•Ubigeo Nacimiento:➳${responseAPI.Ubigeo_Nacimiento}
━━━━━━━━━━━━━✦
`;
      }

      socket.sendMessage(msg.messages[0]?.key?.remoteJid, { text: aswe3 });
    } catch (error) {
      console.error(error);
      socket.sendMessage(msg.messages[0]?.key?.remoteJid, {
        text: `*Error al obtener la información.*`,
      });
    }
  },
};
