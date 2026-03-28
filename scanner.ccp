#include <iostream>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <net/if.h>
#include <sys/ioctl.h>
#include <unistd.h>
#include <netpacket/packet.h>
#include <net/ethernet.h>

// Este módulo de C++ actuará como un "Sniffer" de bajo nivel
// para extraer la identidad física (MAC) del atacante local.

void capture_mac() {
    int sock_raw = socket(AF_PACKET, SOCK_RAW, htons(ETH_P_ALL));
    if(sock_raw < 0) {
        std::cerr << "[!] Error al abrir el socket de bajo nivel." << std::endl;
        return;
    }

    unsigned char *buffer = (unsigned char *)malloc(65536);
    std::cout << "[-] Escaneando firmas físicas de intrusión en la red local..." << std::endl;

    while(true) {
        int data_size = recvfrom(sock_raw, buffer, 65536, 0, NULL, NULL);
        if(data_size > 0) {
            struct ethhdr *eth = (struct ethhdr *)buffer;
            // Si detectamos tráfico hacia nuestros puertos de "trampa"
            // aquí imprimimos la MAC de origen (quien está atacando).
            printf("[!] Actividad detectada - Origen MAC: %.2X:%.2X:%.2X:%.2X:%.2X:%.2X \n",
                   eth->h_source[0], eth->h_source[1], eth->h_source[2], 
                   eth->h_source[3], eth->h_source[4], eth->h_source[5]);
        }
    }
}

int main() {
    capture_mac();
    return 0;
}
