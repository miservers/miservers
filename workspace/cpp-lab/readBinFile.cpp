#include <cstdint>
#include <iostream>
#include <fstream>
using namespace std;

typedef uint8_t u1;
typedef uint16_t u2;
typedef uint32_t u4;

class Data {
    public:
        u2 id;
        u1 tag;
        u4 magic;
        u4 namelength;
        string name;
    
    public:
        Data (){};
        Data(u2 id, u1 tag, u4 magic, string name) {
            this->id = id;
            this->tag = tag;
            this->magic = magic;
            this->name = name;
        }
};

int main()
{
    string filename = "./datas.dat";

    ofstream outf(filename, ios::out|ios::binary);

    Data* data = new Data(0x1234, 0x89, 0xCAFEBABE, "Moh Ami");
    data->namelength = data->name.length();

    outf.write((char *)&data->id, sizeof(u2));
    outf.write((char *)&data->tag, sizeof(u1));
    outf.write((char *)&data->magic, sizeof(u4));
    outf.write((char *)&data->namelength, sizeof(u4));
    outf.write ((char*)&data->name, data->name.length());

    outf.close();

    // READ FILE
    ifstream inf(filename, ios::out | ios::binary);

    Data dataBuf;
    char *buf[20] = {};
    inf.read((char*)&dataBuf.id, sizeof(u2));
    inf.read((char*)&dataBuf.tag, sizeof(u1));
    inf.read((char*)&dataBuf.magic, sizeof(u4));
    inf.read((char*)&dataBuf.namelength, sizeof(u4));
    inf.read((char *)buf, dataBuf.namelength);
    string s(*buf);
    dataBuf.name = s;

    *buf[0] = 'X'; // even if we change buf, s doesnt change

    cout<<"ID: "<<hex<<showbase<<dataBuf.id<<endl;
    cout<<"TAG: (bad display because one char!!!) "<<hex<<showbase<<dataBuf.tag<<endl;
    cout<<"MAGIC: "<<hex<<showbase<<dataBuf.magic<<endl;
    cout<<"NameLEN: "<<dec<<dataBuf.namelength<<endl;
    cout<<"Name: "<<dataBuf.name<<endl;
    cout<<"buf: "<<*buf<<endl;

    inf.close();



}